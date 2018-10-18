import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import {LecturerAPI} from "../../API";

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

  componentWillMount(){

  }

  componentDidMount(){
    new LecturerAPI().checkLoginState(
    (r) => this.props.gotoHomeScreen(r.lecturerID, r.lecturerEmail),
    () =>  this.props.gotoLogin()
  );
  }


  render(){
    const redirect=  this.props.isLoggedIn?<Redirect to="/home" />:<Redirect to="/login" />;
    return(
      <View>

        <Text>Hi</Text>
        {this.props.loading?<View/>:redirect}
      </View>);
  }
};

const mapStateToProps = state=>state.loginStateReducer;
const mapDispatchToProps = dispatch => {
    return {
        gotoHomeScreen: (id, email) => dispatch({type: "LOGIN", email: email, lecturerID: id}),
        gotoLogin: () => dispatch({type: "LOGOUT"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

//export default SplashScreeen;
