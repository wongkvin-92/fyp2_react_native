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

import {LecturerAPI} from "./src/API";

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
import {UserAPI} from './src/API';

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



    constructor(p){
    	super(p);
    	this.state = {loading: false, token: null, myKey: null};
    }

    registerToken = ()=> new UserAPI().registerToken(sharedObj.token, ()=>console.log("Token registered"));

    componentDidMount(){
      console.log("Mounting", pushNotifications);
    	//this.registerToken();
    	//this.storeData('enrolledKey', ["bit100"]);
    	//this.retrieveData('enrolledKey', r=>console.log(r));
    }

 lecturerLogin = ()=>{
     this.setState({isLoggedIn: true});
     this.registerToken();
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
                    login: this.lecturerLogin,
                  logout: ()=> {                   //success() - callback func
                      new LecturerAPI().logout( this.onLogout );
                  },
		    asyncStore:this.storeData,
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
