import API from './base';

export class UserAPI extends API{    
    registerToken(token, success, failure=(r)=>{console.err(r);}){
	this.postRequest("device/",
			 {body: JSON.stringify(token) }
			)
	    .then(r => success(r))
	    .catch(r => failure(r));
    }    
}

export default UserAPI;
