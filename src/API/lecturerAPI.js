import UserAPI from './user';

export class LecturerAPI extends UserAPI{
    login(username, password, onSuccess){
      let data = new FormData();
      data.append('email', username);
      data.append('password', password);

	let action = "lecturers/login/";
	this.postRequest(action,
			 {
			     body: data,
			     'Content-Type': 'multipart/form-data'
			 })
	    .then(r => onSuccess(r));
    }

    downloadSchedule(onSuccess){
	let action = "lecturer/all/schedule/";
	this.getRequest(action)
	    .then(onSuccess)
	    .catch(err => console.log("Schedule download failed", err));
    }

    downloadScheduleHash(onSuccess){
	let action = "lecturer/all/schedule/hash/";
	this.getRequest(action)
	    .then(onSuccess)
	    .catch(err => console.log("Schedule hash download failed", err));
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
        this.getRequest("login/lecturers/")
            .then(r=>r.json())
	    .catch( err =>
		    {}
		  )
        .then(r => {
            if(r)
		onSuccess(r);
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
