const artisan = "192.168.0.86";
const myHome = "192.168.0.189";
const mcdKotaDam = "192.168.182.251";
const mcdDamansara2 ="192.168.182.246";
const bandarSriDam = "192.168.1.134";
const help = "10.125.194.59";
const darr = "192.168.0.7";
const ace ="192.168.1.106";
const qi ="192.168.0.6";
const srvHome = "192.168.0.142";
const coffee = "192.168.0.198";
const kpd = "10.100.193.102";
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


export default API;
