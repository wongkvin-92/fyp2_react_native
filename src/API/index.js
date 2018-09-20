const host = "10.125.194.162";
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

}

export class LecturerAPI extends API{
    login(username, password, onSuccess){

      let data = new FormData();
      data.append('email', username);
      data.append('password', password);

      let action = "lecturers/login/";
      fetch(this.host+action, {
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
            onSuccess()
          else
            onFailure();
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

    logout(success){
      let action = "lecturers/logout/";
      fetch(this.host+action, {credentials: "same-origin"})
      .then(()=>{
        alert("Logout successful");
        success();
        }
    );

    }
};

export default API;
