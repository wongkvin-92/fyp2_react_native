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


class MainApp extends React.Component {
  state={loading: true, isLoggedIn: false};

  componentWillMount(){
    //Load state from the server
    new LecturerAPI().checkLoginState(
      () =>    this.setState({isLoggedIn: true, loading: false}),
      () =>     this.setState({isLoggedIn: false, loading: false})
    );
  }

 lecturerLogin = ()=>{
   this.setState({isLoggedIn: true});
  }
  //success() - callback func
  onLogout = ()=> this.setState({isLoggedIn: false});

  render(){
    return (
      <NativeRouter>
      <GenerateRoutes
        commonRoutes={commonRoutes}
        loginState={this.state.isLoggedIn}
        props={
          {
            changeLogin: ()=>{},
            login: this.lecturerLogin,
            logout: ()=> {                   //success() - callback func
              new LecturerAPI().logout( this.onLogout )
            },
            setLogin: this.setLogin,
                      ...this.state
          }
        }
       />
      </NativeRouter>
    );
  }
}

export default MainApp;
