import React, {Component} from 'react';

import {View, Text} from 'react-native';

import {LecturerAPI} from "../../API";

import {Redirect} from 'react-router';

import {connect} from 'react-redux';

/*new LecturerAPI().checkLoginState(
  () =>    this.setState({isLoggedIn: true, loading: false}),
  () =>     this.setState({isLoggedIn: false, loading: false})
);*/



class SplashScreen extends Component{

  componentDidMount(){
      new LecturerAPI().checkLoginState(
      (r) => this.props.gotoHomeScreen(r.lecturerID, r.lecturerEmail),
      () =>  this.props.gotoLogin()
    );
  }


  render(){
    const redirect=  this.props.isLoggedIn?<Redirect to="/home" />:<Redirect to="/login" />;
    return(<View>
      <Text>SplashScreen</Text>
      {this.props.loading?<View/>:redirect}
      </View>);
  }
};


const mapDispatchToProps = dispatch => {
    return {
        gotoHomeScreen: (id, email) => dispatch({type: "LOGIN", email: email, lecturerID: id}),
        gotoLogin: () => dispatch({type: "LOGOUT"})
    };
};

export default connect(state=>state.loginStateReducer, mapDispatchToProps)(SplashScreen);

//export default SplashScreeen;
