import UserAPI from './user';

export class StudentAPI extends UserAPI{

  login(studentID, password, onSuccess){
    let data = new FormData();
    data.append('studentID', studentID)
    data.append('password', password);

    let action = "student/login/";
    fetch(this.host+action, {
      method: "post",
      body: data,
      credentials: "same-origin",
      'Content-Type': 'multipart/form-data'
    }).then(
      r=>r.json()
    ).then( (r) => {
      onSuccess(r);
    }).catch(
      (err)=> {
        alert("Cannot login. Error: "+err);
      }
    );
  }

  checkLoginState(onSuccess, onFailure){
      this.getRequest("state/student/")
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

  fetchProfile(callback){
    this.getRequest("state/student/").
        then(r=>callback(r))
        .catch( err => alert(err) );
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

   displaySubjectList(onSuccess){
     this.getRequest("subjects/").
         then(r=>onSuccess(r))
         .catch( err => alert(err) );
   }

   logout(success){
     let action = "student/logout/";
     fetch(this.host+action, {credentials: "same-origin"})
     .then(()=>{
       alert("Logout successful!");
       success();
       }
     );
   }
}
