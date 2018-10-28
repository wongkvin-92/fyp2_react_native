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


import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from "./src/store";

import { pushNotifications } from './src/services';
import {UserAPI} from './src/API';

const sharedObj = {};
pushNotifications.configure(sharedObj);


class MainApp extends React.Component {
    
    constructor(p){
	super(p);
	this.state = {loading: false, token: null};
    }

    registerToken = ()=> new UserAPI().registerToken(sharedObj.token, ()=>console.log("Token registered"));
    
    componentDidMount(){
	this.registerToken();
	console.log("Component HAS MOUNTED");
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
       <PersistGate loading={null} persistor={persistor}>
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
                  setLogin: this.setLogin,
                            ...this.state
                }
              }
             />
            </NativeRouter>
          </PersistGate>
      </Provider>
    );
  }
}



//const ConnectedMainApp = connect(state => state.loginStateReducer)(MainApp);
export default MainApp;
