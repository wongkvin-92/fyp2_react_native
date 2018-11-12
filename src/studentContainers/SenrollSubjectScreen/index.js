import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Picker,
  Animated
} from 'react-native';

import {
  Card, Button
} from 'react-native-elements';

import SubjectCard from './components/subjectCardView';
import SearchSubject from './components/searchBar';

import {Redirect, Link} from 'react-router-native';
import {StudentAPI} from '../../API';
import {connect} from 'react-redux';

import styles from './style';
/*
const sampleData = [
  {title: "bit200", subName:"IT & Entrepre", type:"lecture1", day:"monday" , duration:"2"},
  {title:"bit306", subName:"Web Tech", type:"lecture1",  day:"tuesday", duration:"2"},
  {title:"bit208", subName:"Data Struct", type:"lecture1", day:"wednesday", duration:"2"},
  {title:"bit301", subName:"IT Proj Mgmt", type:"lecture1",  day:"thursday",duration:"2"},
  {title:"bit103", subName:"Intro DB", type:"lecture1", day:"friday", duration:"2"}
];*/

class EnrollScreen extends React.Component{

  state={
      redirect:false,
      rawdata: [],
      processedData: [],
      fadeAnim: new Animated.Value(0)
  };
    
    //filterOutSubjects = (d, localList) => d.filter(e=>localList.indexOf(e.subjectID)==-1);

    setEnrolledState = (d, localList) => d.map(e => ({...e, enrolledStatus: localList.indexOf(e.subjectID)>=0}));
    
  downloadList = ()=>{
    new StudentAPI().displaySubjectList(
        (d) => {
	    //let filteredData = this.filterOutSubjects(d, this.props.enrolledSubject);
	    this.setState({rawdata: d});
	    //console.log("ENROLLED SUBJECT", this.props.enrolledSubject);	    
	    this.updateSubjectList(d, this.props.enrolledSubject);
	}
    );
  }

    componentDidMount(){
	console.log("props");
	console.log(this.props);
	Animated.timing(                  // Animate over time
	    this.state.fadeAnim,            // The animated value to drive
	    {
		toValue: 1,                   // Animate to opacity: 1 (opaque)
		duration: 1000              // Make it take a while
	    }
	).start();

	this.downloadList();
    }

    
    updateSubjectList(rawdata, enrolledSubjects){
	let processedData = this.setEnrolledState(rawdata, enrolledSubjects);
	this.setState({processedData: processedData});
    };

    unenrollSubjectClick = (subjectId) => {
	this.props.unenrollSubject(subjectId);
	this.props.requestSync();
	//this.updateSubjectList();	
    }
    
    enrollSubjectClick = (subjectId) => {
	//alert("Enrolling subject "+subjectId);
	this.props.enrollSubject(subjectId);
	this.props.requestSync();
	//this.updateSubjectList();
	/*
	this.props.enrollSubject(subjectId);
 
	let data = this.filterOutSubjects(this.state.data, this.props.enrolledSubject);
	this.setState({data: this.state.data.filter(e => e.subjectID != subjectId) });	
	*/
    }

    componentWillReceiveProps(newProps){
	
	if ( newProps.enrolledSubject != this.props.enrolledSubject){
	    console.log("enrolled subject updated", newProps.enrolledSubject);	    
	    newProps.asyncStore('enrolledSubject', JSON.stringify(newProps.enrolledSubject));
	    
	    let processedData = this.setEnrolledState(this.state.rawdata, newProps.enrolledSubject);	
	    this.setState({processedData: processedData});

	    //this.updateSubjectList(this.state.rawdata, newProps.enrolledSubject);
	}
    }

  render () {

    return  (

        <View style={styles.containers}>

             {this.state.redirect?<Redirect to="/login" />:<View/>}

             <View style={styles.titleStlye}>

                 <View style={styles.titleCenterStyle}>
                <Text style={styles.titleTextStyle}>Subject Enroll</Text>
                </View>
             </View>
             <SearchSubject />
             <View style={{flex: 1}}>
             <Animated.View style={[{opacity: this.state.fadeAnim}]}>
             <ScrollView >

               <View style={{marginBottom: 30}}>
                {
                  this.state.processedData.map( (e,key) =>
                    <SubjectCard
				       key={key}
				       clickHandler={this.enrollSubjectClick}
				       removeHandler={this.unenrollSubjectClick}
                      {...e}
                    />
                  )
                }
              </View>
             </ScrollView>
            </Animated.View>
          </View>
        </View>


  );

  }
}
const mapStateToProps = p => p.studentStateReducer;

const mapDispatchToProps = dispatch => {
    return {
	enrollSubject: s => dispatch({type: "ENROLL_SUBJECT", subject: s}),
	unenrollSubject: s => dispatch({type: "UNENROLL_SUBJECT", subject: s}),
	requestSync: ()=> dispatch({type: "OUT_OF_SYNC"})
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EnrollScreen);

/*
<Button
  rounded
  title="Back"
  icon={{name: 'visibility'}}
  buttonStyle= {styles.cancelBtnStyle}
  textStyle = {styles.cancelBtnTextStyle}
  />*/
