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

  </View
);

state={
  showMe: true
};
*/
class SplashScreen extends Component{

    runStudentStartup(){
	this.props.asyncLoad("enrolledSubject", (data) => {
	    console.log("ASYNC LOADING", data);
	    this.props.setSubjectList(JSON.parse(data));
	});

	let period = {start_date: "2018-11-04", end_date: "2018-11-07"};
	//this.props.setPeriod(period);


	let permenantClass = {};
	let replacementClass = {};
	this.props.updateSchedule(
	    this.props.studentService.generateSchedule(null, null, period.start_date, period.end_date)
	);


	console.log("Student service");
	console.log(this.props.studentService);
    }

    componentDidMount(){
	console.log("Splash screen component did mount");
	console.log(this.props);



	new UserAPI().checkLoginState(
	    (r) => {
    		this.props.gotoHomeScreen(r);
    		if(r.type == "student"){
    		    this.runStudentStartup();
            new UserAPI().downloadSemester(r => {
              this.props.setPeriod(r);
            });
            /*new UserAPI().startSyncSchedule(
              ({period})=>{
                  this.props.setPeriod(period);
                 console.log("Successfully synchronized");
             },
             ()=>{ console.log("Synchronized failure"); },

           );*/
       }
	    },
	    () =>  {console.log("Failed to retreive login state");}
	);



	/*
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
	);*/
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
