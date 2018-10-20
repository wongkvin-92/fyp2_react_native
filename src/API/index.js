const artisan = "192.168.0.79";
const myHome = "192.168.0.189";
const mcdKotaDam = "192.168.182.120";
const bandarSriDam = "192.168.1.134";
const help = "10.125.197.86";
const darr = "192.168.0.7";
const ace ="192.168.1.114";
const host = artisan;
const port = 80;
const path = "fypBackEnd";

export class API {
  constructor(){
    this.host =  "http://"+host+":"+port+"/"+path+"/";
    this.dir = "fypBackEnd";
    this.headers =  {credentials: "same-origin"};
  }

  getRequest(action){
    let url = this.host+action;
    return fetch(url, this.headers)
      .then(r=>r.json())
    ;
  }

  postRequest(action, headers={}){
    let url = this.host+action;
    return fetch(url, {...this.headers, method: "post", ...headers})
     .then( r=> { console.log(r); return r;})
      .then(r=>r.json())
      .catch(r => console.log(r))
    ;
  }

    patchRequest(action, headers={}){
    	let url = this.host+action;
    	return fetch(url, {...this.headers, method: "patch", ...headers})
    	    .then( r=> { console.log(r); return r;})
    	    .then(r=>r.json())
    	    .catch(r => console.log(r))
	    ;
    }


    deleteRequest(action, headers={}){
    let url = this.host+action;
    return fetch(url, {...this.headers, method: "delete", ...headers})
     .then( r=> { console.log(r); return r;})
      .then(r=>r.json())
      .catch(r => console.log(r))
    ;
  }


}

export class LecturerAPI extends API{
    login(username, password, onSuccess){

      let data = new FormData();
      data.append('email', username);
      data.append('password', password);

      let action = "lecturers/login/";
      fetch(this.host+action,{
        method: "post",
        body: data,
        credentials: "same-origin",
        'Content-Type': 'multipart/form-data'
      }).then(
        r=>r.json()
      ).then( (r) => {
          console.log(data);
          console.log(this.host+action);
          onSuccess(r);
      }).catch(
        (err)=> {
          alert("Cannot login. Error:  "+err);
        }
      );
    }

    deleteCancellationRequest(id, callback){
      this.deleteRequest("reschedule/"+id+"/cancel/remove/").
          then(r=>callback(r))
          .catch( err => console.log(err) );
    }


    fetchProfile(callback){
      this.getRequest("login/lecturers/").
          then(r=>callback(r))
          .catch( err => alert(err) );
    }

    fetchSchedule(date, callback){
      this.getRequest("lecturers/schedule/"+date).
          then(r=>callback(r))
          .catch( err => console.log(err) );
    }

    checkLoginState(onSuccess, onFailure){
        fetch("http://"+host+"/fypBackEnd/login/lecturers/", {credentials: "same-origin"})
        .then(r=>r.json())
        .then(r => {
          if(r)
            onSuccess(r)
          else
            onFailure(r);
        });
    }

    cancelLesson(lessonId, date, callback){
      let action = "lessons/"+lessonId+"/date/"+date+"/cancel/"
      console.log(action);
      this.postRequest(action)
        .then( r=> callback(r));
    }

    displayLessonList(onSuccess){
      this.getRequest("lessons/").
          then(r=>onSuccess(r))
          .catch( err => alert(err) );
    }

    cancelLessonList(lessons, callback){
      let action = "reschedule/cancel/list/";
      this.postRequest(action, {
        body: JSON.stringify({data: lessons})
      }).then(callback);
    }

    displayCancelledList(filter, onSuccess){
    	var action = "cancel/lecturer/list/";
    	if(filter != "all"){
    	    action += "filter/"+filter;
    	}
          this.getRequest(action).
              then(r=>onSuccess(r))
              .catch( err => alert(err) );
     }

    requestRescheduleClass(id, date, time, onSuccess){
    	let action = "reschedule/"+id+"/replace/";
    	let data = JSON.stringify({
    	    "date": date,
    	    "time": time
    	});
    	this.patchRequest(
    	    action,
    	    {
    	    body: data
    	}).then(onSuccess);
    }

    logout(success){
      let action = "lecturers/logout/";
      fetch(this.host+action, {credentials: "same-origin"})
      .then(()=>{
        alert("Logout successful!");
        success();
        }
      );
    }
};

export default API;
