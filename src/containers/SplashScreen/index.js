import React, {Component} from 'react';

import {View, Text} from 'react-native';

import {LecturerAPI} from "../../API";

import {Redirect} from 'react-router';

import {connect} from 'react-redux';

class SplashScreen extends Component{
  render(){
    const redirect=  this.props.isLoggedIn?<Redirect to="/home" />:<Redirect to="/login" />;
    return(<View>
      <Text>SplashScreen</Text>
      {this.props.loading?<View/>:redirect}
      </View>);
  }
};

export default connect(state=>state.loginStateReducer)(SplashScreen);

//export default SplashScreeen;
