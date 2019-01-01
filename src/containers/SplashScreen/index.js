import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import {LecturerAPI, UserAPI, StudentAPI} from "../../API";

import {Redirect} from 'react-router';

import {connect} from 'react-redux';

import {ServerStatus} from '../../action';


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
	runLecturerStartup(){
	    this.props.asyncLoad("semesterChecksum", c => {
				console.log("SEMESTER CHECKSUM LOADED", c);

		//this.props.setSemesterChecksum(c);
	    });

			this.props.asyncLoad("period", p => {
				let period = JSON.parse(p);
				this.props.setLecturerPeriod(period);
			});
	}

	runStudentStartup(){
	    //clear data for testing purpose
	    //this.props.asyncStore('semesterChecksum', "");
	    //this.props.asyncStore('enrolledSubject', "");
	    //this.props.asyncStore("storedSubjects", "");
	    this.props.asyncLoad("subjectList", (storedSubjects) => {
		let schedule = JSON.parse(storedSubjects);
		console.log("STORED SUBJECTS LOADED", schedule);
		this.props.setSchedule(schedule);
	    });

	    this.props.asyncLoad("enrolledSubject", enrolledSubject => {
				let subjectList = JSON.parse(enrolledSubject);
				console.log("ENROLLED SUBJECT LOADED", subjectList);
				if(subjectList)
				this.props.setSubjectList(subjectList);
	    });

	    this.props.asyncLoad("semesterChecksum", c => {
		//console.log("SEMESTER CHECKSUM LOADED", c);
		this.props.setSemesterChecksum(c);
	    });

	    this.props.asyncLoad("period", p => {
				let period = JSON.parse(p);
				this.props.setPeriod(period);
	    });

	}


      downloadAllSubjects(period, subList, storedChecksum, storedSubjects = []){
          //let subList = this.props.studentStateReducer.enrolledSubject;
	  let scheduleSync = this.props.studentService;

	  console.log("Splash screen download initiated");
          if(subList.length > 0 && this.props.studentStateReducer.period != null){

	      /*
	      new StudentAPI().downloadSemesterChecksum(
		  subList,
		  data => {
		      console.log("SEMESTER CHECKSUM: ",data);
		      if(data){
			  console.log(storedChecksum + " vs "+ data.key);
			  if(data.key != storedChecksum){
			      console.log("index.downloadAllSubject: Downloading the schedule..");
			      new StudentAPI().downloadAllSubjects(subList, r => scheduleSync.generateSchedule(r, period, e=>{
				  this.props.setSchedule(e);
				  this.props.setSemesterChecksum(data.key);
				  this.props.asyncStore('semesterChecksum', data.key);
				  this.props.asyncStore('subjectList', JSON.stringify(e));
			      }));
			  }else{
			      console.log("Skipping download, data already in sync with server");
			      this.props.setSchedule(JSON.parse(storedSubjects));

			  }
		      }
		  }

	      );*/



          }else{
              console.log("Please enroll subject");
         }
      }


      runStartup(credentials){
	  		console.log("Starting up screen");
    	  if(credentials.type == "student"){
			      console.log("Running student startup");
		    	      this.runStudentStartup();  //Load data from async AsyncStorage

		/*
			     new UserAPI().downloadSemester(period => {
				  		console.log("period was received as ", period, this.props.studentStateReducer.period);
							if( JSON.stringify(this.props.studentStateReducer.period) != JSON.stringify(period) )
							{
								this.props.setPeriod(period);
				  			this.props.asyncStore('period', JSON.stringify(period));
							}
			      });*/

			  }
	  if(credentials.type == "lecturer"){
	      this.runLecturerStartup();
	      console.log("Running lecturer startup");
	  }
      }

    componentDidMount(){
			console.log("Splash screen component did mount", this.props);

			var isConnected = false;

		 const runMe = () => {
				new UserAPI().checkServer(
					()=> {
						if(!isConnected)
							this.props.server.connectServer();
						isConnected = true;
						},
					(err)=>{
						if(isConnected)
							this.props.server.disconnectServer();
						isConnected = false;
						 console.log("Failed to connect", err);
					 },
					()=> setTimeout(runMe, 1800)
				);
			};

			//setInterval(runMe, 1800);
			runMe();


			//console.log(this.props);

			/*new UserAPI().startSyncSchedule(({schedule, period})=>{
				let data = schedule;
				this.props.updateSchedule(data);
				this.props.setPeriod(period);
				console.log("Successfully synchronized");
			},
			()=>{ console.log("Synchronized failure"); },
		    this.props.studentStateReducer
			);*/

			//Load credentials first
			this.props.asyncLoad("credentials", (credentials) => {
				console.log("Credentials loaded as ", credentials);  //In android sometimes it stops here @Issue: ASYNCSTORAGE BUG
					if(credentials == null || credentials == "null")
						console.log("Credentials are empty");
			    else{
							console.log("Credentials are not empty", JSON.parse(credentials));
							this.props.setCredentials(JSON.parse(credentials));
							this.runStartup(JSON.parse(credentials));
			    }
			});

	//Check login state from server and update credential variable if necessary




 //load credential from server
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
		this.props.setCredentials(r);
		//this.props.gotoHomeScreen(r);
	    },
	    (r) =>  {console.log("Failed to retreive login state", r);}
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
};

const mapDispatchToProps = dispatch => ({
        setCredentials: (c) => dispatch({type: "LOGIN", credentials: c}),
        gotoLogin: () => dispatch({type: "LOGOUT"}),
	      setSubjectList: (data) => dispatch({type: "SET_SUBJECT", subject: data}),
	      updateSchedule: data => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
        setPeriod: data => dispatch({type: "SET_PERIOD", period: data}),
				setLecturerPeriod: (data) => dispatch({type: "SET_LECTURER_PERIOD", period: data}),
				setSchedule: (data) => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
				setSemesterChecksum: data => dispatch({type: "SET_CHECKSUM", payload: data}),
				sync: () => dispatch({type: "SYNC_DONE"}),
				'server': ServerStatus.actions(dispatch)
    });


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
//export default SplashScreeen;
