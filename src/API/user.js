import API from './base';

export class UserAPI extends API{    
    registerToken(token, success, failure=(r)=>{console.err(r);}){
	this.postRequest("device/",
			 {body: JSON.stringify(token) }
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


    checkLoginState(onSuccess, onFailure){	
        this.getRequest("login/state/")
        .then(r => {
            if(r.result)
		onSuccess(r);
            else
		onFailure(r);
        });
    }

}

export default UserAPI;
