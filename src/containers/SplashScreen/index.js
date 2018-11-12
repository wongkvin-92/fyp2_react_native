import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import {LecturerAPI, UserAPI, StudentAPI} from "../../API";

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
	    //clear data for testing purpose
	    this.props.asyncStore('semesterChecksum', "");
	    //this.props.asyncStore('enrolledSubject', "");

	    //Load subjectList
	    this.props.asyncLoad("subjectList", (storedSubjects) => {
		if(storedSubjects)
		    this.props.updateSchedule(JSON.parse(storedSubjects));
		
		//Load checksum
		this.props.asyncLoad("semesterChecksum", storedChecksum => {
		    
		    
		    //Load period from async storage and also
		    // download All subjects if necessary
		    this.props.asyncLoad('period', periodData => {
			//load enrolled subject from async storage
			this.props.asyncLoad("enrolledSubject", (enrolledSubjects) => {
			    console.log("Enrolled subjects", enrolledSubjects);
			    if(enrolledSubjects){				
				let period = JSON.parse(periodData);
				this.props.setSubjectList(JSON.parse(enrolledSubjects));
				this.props.setPeriod(period);
				this.downloadAllSubjects(period, enrolledSubjects, storedChecksum, storedSubjects);
			    }

			    //Update the checksum in redux tree after all the above
			    if(storedChecksum)
				this.props.setSemesterChecksum(storedChecksum);
			    this.props.sync();
			});
			/*
			  if(data){
			  let period = JSON.parse(data);
			  this.props.setPeriod(period);
			  this.downloadAllSubjects(period);
			  }*/
		    });
		    
		    
		});
	    });

	//console.log("Student service");
	//console.log(this.props.studentService);
	}
      
      downloadAllSubjects(period, subList, storedChecksum, storedSubjects = []){
          //let subList = this.props.studentStateReducer.enrolledSubject;
	  let scheduleSync = this.props.studentService;
	  
          if(subList.length > 0 && this.props.studentStateReducer.period != null){	      	  
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
		  
	      );	 	      
          }else{
              console.log("Please enroll subject");
         }
      }      


      runStartup(credentials){	  
    	  if(credentials.type == "student"){
    	      this.runStudentStartup();		    
	      new UserAPI().downloadSemester(period => {
		  console.log("period was received as ", period);
		  this.props.setPeriod(period);
		  this.props.asyncStore('period', JSON.stringify(period));
	      });		    

	  }
      }


    componentDidMount(){
	console.log("Splash screen component did mount");
	console.log(this.props);

	//Load credentials first
	this.props.asyncLoad("credentials", (credentials) => {
	    if(!credentials)
		console.log("Credentials are empty");
	    else{
		this.runStartup(JSON.parse(credentials));
	    }
	});

	//Check login state from server and update credential variable if necessary
	new UserAPI().checkLoginState(
	    (r) => {
		let c = this.props.studentStateReducer.credentials;
    		this.props.setCredentials(r);
		if(!c){
		    console.log("Credentials was not set initially");
		    this.runStartup(r);
		}
		this.props.asyncStore('credentials', JSON.stringify(r));
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
        setCredentials: (c) => dispatch({type: "LOGIN", credentials: c}),
        gotoLogin: () => dispatch({type: "LOGOUT"}),
	      setSubjectList: (data) => dispatch({type: "SET_SUBJECT", subject: data}),
	      updateSchedule: data => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
        setPeriod: data => dispatch({type: "SET_PERIOD", period: data}),
	setSchedule: (data) => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
	setSemesterChecksum: data => dispatch({type: "SET_CHECKSUM", payload: data}),
	sync: () => dispatch({type: "SYNC_DONE"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
//export default SplashScreeen;
