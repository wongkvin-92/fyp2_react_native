/**
 * Lecturer React Native App
 *
 * @format
 * @flow
 */

import React from 'react';

//import {loggedIn, notLoggedIn} from "./src/Routes";
import {commonRoutes} from "./src/Routes";
import GenerateRoutes from './src/GenerateRoutes';

import {UserAPI} from "./src/API";

import {RedirectTo, NativeRouter, Route, Link} from 'react-router-native';
import {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Image,
    Platform,
    Button,
    TouchableOpacity,
    StyleSheet} from 'react-native';


//import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store from "./src/store";

import { pushNotifications, scheduleSyncServices } from './src/services';

import {AsyncStorage} from 'react-native';
//import _ from 'loadash';

// To see all the requests in the chrome Dev tools in the network tab.
//XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//    GLOBAL.originalXMLHttpRequest :
//    GLOBAL.XMLHttpRequest;

// fetch logger

/*
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
      console.log('Fetch', { request: { uri, options, ...args }, response  });
    return response;
  });
  };*/

const sharedObj = {};
pushNotifications.configure(sharedObj);
const studentService = new scheduleSyncServices.StudentScheduleSystem(sharedObj);

class MainApp extends React.Component {
    storeData = async (key, value, onSuccess= () => {}) =>{
	try {
	    console.log("Saving "+key);
            await AsyncStorage.setItem('@MySuperStore:'+key, value);
            if(onSuccess!=null)
		onSuccess();
	    console.log("successfully saved");
	} catch (error) {
            console.log("Error saving data" + error);
	}
    }

    retrieveData = async (key, onRetrieved) => {
	try {
	    console.log("Loading "+key);
            const value = await AsyncStorage.getItem('@MySuperStore:'+key);
	    console.log("successfully loaded");
        //this.setState({myKey: value});
        onRetrieved(value);
      } catch (error) {
        console.log("Error retrieving data" + error);
      }
    }

    clearData =   async (key, onSuccess=null, onFailure=null) => {
       try {
	   await AsyncStorage.removeItem(key);
	   if(onSuccess){
	       onSuccess();	       
	   }
    }
	catch(err) {
	    if(onFailure)
		onFailure(err);
    }
  }



    constructor(p){
    	super(p);
    	this.state = {loading: false, token: null, myKey: null};
    }

    registerToken = ()=> new UserAPI().registerToken(sharedObj.token, ()=>console.log("Token registered"));

    componentDidMount(){
	/*let g = new scheduleSyncServices.StudentScheduleSystem();
	console.log("loading notification service ", pushNotifications);
	console.log("loading student service", scheduleSyncServices);*/
    	this.registerToken();
    	//this.storeData('enrolledKey', ["bit100"]);
    	//this.retrieveData('enrolledKey', r=>console.log(r));
    }    

    login = ()=>{	
	this.setState({isLoggedIn: true});
	//this.registerToken();
    }    
  //success() - callback func
  onLogout = ()=> this.setState({isLoggedIn: false});

  render(){
    return (
      <Provider store={store}>
          <NativeRouter>
            <GenerateRoutes
              commonRoutes={commonRoutes}
              props={
                {
                  changeLogin: ()=>{},
                    login: this.login,
                    logout: (onSuccess, onFailure)=> {                   //success() - callback func
                      new UserAPI().logout( ()=>{
			  this.onLogout();
			  onSuccess();			  
		      }, ()=>alert("Logout failed"));
                  },
		    asyncStore:this.storeData,
		    asyncClear: this.clearData,		    
                    asyncLoad:this.retrieveData,
                    setLogin: this.setLogin,
                    ...this.state,
		    studentService: studentService
              }}
             />
            </NativeRouter>
      </Provider>
    );
  }
}



//const ConnectedMainApp = connect(state => state.loginStateReducer)(MainApp);
export default MainApp;
