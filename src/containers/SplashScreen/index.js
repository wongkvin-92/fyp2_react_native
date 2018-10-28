import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import {LecturerAPI, UserAPI} from "../../API";

import {Redirect} from 'react-router';

import {connect} from 'react-redux';

/*new LecturerAPI().checkLoginState(
  () =>    this.setState({isLoggedIn: true, loading: false}),
  () =>     this.setState({isLoggedIn: false, loading: false})
);*/
/*
const SplashCard = () => (
  <View>
    <Text> Splash Screen </Text>

  </View>
);

state={
  showMe: true
};
*/
class SplashScreen extends Component{
  componentDidMount(){
    new UserAPI().checkLoginState(
	(r) => this.props.gotoHomeScreen(r),
	() =>  this.props.gotoLogin()
    );
  }

  render(){
    const redirect=  this.props.isLoggedIn?<Redirect to="/home" />:<Redirect to="/login" />;
    return(
      <View>
        <Text>Loading</Text>
        {this.props.loading?<View/>:redirect}
      </View>);
  }
};

const mapStateToProps = state=>state.loginStateReducer;
const mapDispatchToProps = dispatch => {
    return {
        gotoHomeScreen: (c) => dispatch({type: "LOGIN", credentials: c}),
        gotoLogin: () => dispatch({type: "LOGOUT"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

//export default SplashScreeen;
