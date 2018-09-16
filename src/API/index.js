const host = "192.168.1.91";
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
    console.log(url);
    return fetch(url, this.headers)
      .then(r=>r.json())
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
