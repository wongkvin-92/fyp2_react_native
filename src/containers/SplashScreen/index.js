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
	console.log("Splash screen component did mount");
	console.log(this.props);
	this.props.asyncLoad("enrolledSubject", (data) => {
	    this.props.setSubjectList(JSON.parse(data));
	});

	new UserAPI().checkLoginState(
	    (r) => {

		if(r.type=="student"){
		    new UserAPI().startSyncSchedule(
			({schedule, period})=>{
          let data = schedule;
			    this.props.updateSchedule(data);
          this.props.setPeriod(period);
			    console.log("Successfully synchronized");
			},
			()=>{ console.log("Synchronized failure"); },
			this.props.studentStateReducer
		    );
		}

		this.props.gotoHomeScreen(r);
	    },
	    () =>  {console.log("Failed to retreive login state");}
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

const mapStateToProps = (state)=> {
    return {
	loginStateReducer:   state.loginStateReducer,
	studentStateReducer: state.studentStateReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        gotoHomeScreen: (c) => dispatch({type: "LOGIN", credentials: c}),
        gotoLogin: () => dispatch({type: "LOGOUT"}),
	      setSubjectList: (data) => dispatch({type: "SET_SUBJECT", subject: data}),
	      updateSchedule: data => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
        setPeriod: data => dispatch({type: "SET_PERIOD", period: data})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
//export default SplashScreeen;
