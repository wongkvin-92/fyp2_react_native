import React, {Component} from 'react';

import {View, Text} from 'react-native';

import {LecturerAPI} from "../../API";

import {Redirect} from 'react-router';
class SplashScreeen extends Component{

/*
    componentWillMount(){
      new LecturerAPI().checkLoginState(
        alert("Logged in"),
        alert("Not logged in")
      );
    }
*/
  render(){
    const redirect=  this.props.isLoggedIn?<Redirect to="/home" />:<Redirect to="/login" />;
    return(<View>

      <Text>SplashScreen</Text>
      {this.props.loading?<View/>:redirect}
      </View>);
  }
};

export default SplashScreeen;
