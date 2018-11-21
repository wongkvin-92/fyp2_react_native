import API from './base';
import DeviceInfo from 'react-native-device-info';

export class UserAPI extends API{
    registerToken(token, success, failure=(r)=>{console.error(r);}){

      let postData = {token: token.token, devid: DeviceInfo.getUniqueID()};
      console.log("Register post data", postData);

	this.postRequest("device/",
			 {
         body: JSON.stringify(postData)
       }
			)
	    .then(r => success(r))
	    .catch(r => failure(r));
    }

    login(username, password, onSuccess){
	let data = new FormData();
	data.append('email', username);
	data.append('password', password);

	let action = "login/";
	this.postRequest(action,
			 {
			     body: data,
			     'Content-Type': 'multipart/form-data'
			 })
	    .then(r => onSuccess(r));
    }

    logout(success, failure=()=>{console.log("Logout failed")}){
      let action = "logout/";
	fetch(this.host+action, {credentials: "same-origin"})
	    .then(()=>{
		success();
	    }).catch(ex => failure());
    }



    checkLoginState(onSuccess, onFailure = ()=>{}){
        this.getRequest("login/state/")
        .then(r => {
            if(r.result)
		onSuccess(r);
            else
		onFailure(r);
        }).catch( (err) => onFailure(err));
    }

    _getDays(s, e) {
    var a = [];
    while(s < e) {
      let x = s;
      let fixZero = e => Math.floor(e/10) ==0? "0"+ e:e +"";
      let m = x.getMonth()+1;
      let month = fixZero(m);
      let year = x.getFullYear();
      let date = fixZero(x.getDate())
      let formatDate = [year, month, date].join("-");
        a.push(formatDate);
        s = new Date(s.setDate(
            s.getDate() + 1
        ));
    }
    return a;
    };

    _downloadSubjectLessonForStudent(date, subjectList, onSuccess, params={}){
    	var action ="student/schedule/"+ date;
    	this.postRequest(action,
    			 {
    			     body: JSON.stringify({subjectList:subjectList})
    			 }
    			)
    	    .then(r=>onSuccess(r, params));
   }

    _startSyncSchedule(onSuccess, onFailure, reducer, period){
    	console.log("Syncing with the server...");

    	 if(reducer.downloadState == "idle" ){
      	    if(reducer.syncState == "none"){
          		/**
          		 * Download Fresh schedule for the semester
          		 **/
               let d1 = period.start_date.split("-").map(e=>parseInt(e));
               let d2 = period.end_date.split("-").map(e=>parseInt(e));
          		//let startDate = new Date(d1[0], d1[1]-1, d1[2]);
              let startDate = new Date();
          		let endDate = new Date(d2[0], d2[1]-1, d2[2]);
          		//endDate.setMonth(endDate.getMonth()+2);

          		let dateArr = this._getDays(new Date(startDate), new Date(endDate));


          		let emptySchedules = {};
          		dateArr.forEach( el => emptySchedules[el]=[]);
          		//console.log(emptySchedules);
              console.log(emptySchedules);
          		onSuccess({schedule: emptySchedules, period});
              if(reducer.enrolledSubject.length == 0){
                console.log("You need to enroll subject before requesting for the schedule.");
                return;
              }

          		let startTime = new Date();
          		let timeSum = 0;
          		let newSchedule = {};
          		for(var i = dateArr.length; i>= 0; i--){
          		    this._downloadSubjectLessonForStudent(dateArr[i],
          						      reducer.enrolledSubject,
          							  (r, i) => {
          							      newSchedule[dateArr[i]] = r;

          							      if(i==0){
          								  //console.log({...emptySchedules, ...newSchedule});
          								  onSuccess({schedule: enewSchedule, period});
          							      }
          							  },
          							 i);
          		}
          	}
      	}
      }

      startSyncSchedule(onSuccess, onFailure){
        /*this.downloadSemester( (r)=> {
          if(r.start_date != null){
            let period = {start_date: r.start_date, end_date: r.end_date};
            //this._startSyncSchedule(onSuccess, onFailure, period);
          }
        });*/
      }

      downloadSemester(onSuccess){
        this.getRequest("semester/")
          .then(r=>onSuccess(r))
        .catch( err => console.log(err) );
      }

}

export default UserAPI;
