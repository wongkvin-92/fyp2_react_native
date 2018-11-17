import hash from 'object-hash';

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  Picker
} from 'react-native';

import {connect} from 'react-redux';

import {
  Card, Button
} from 'react-native-elements';

import {Redirect, Link} from 'react-router-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {StudentAPI} from "../../API";

import DailyScheduleItem from './components/DailyScheduleItems';

import {styles} from './style';

import {scheduleSyncServices} from '../../services';


/**
 * Create new Agenda Class without onVisibleMonthsChange()
 * to fix a bug.
 **/
class CustomAgenda extends Agenda{
  constructor(p)
  {
    super(p);
  }

  onVisibleMonthsChange(months) {
    //Do nothing
  }
}



class ShomeScreen extends React.PureComponent{
  constructor(props){
    super(props);

      this.scheduleService = new scheduleSyncServices.StudentScheduleSystem({});
    let today = this.formatDate(new Date());
    this.state={
      redirect:false,
    	items: {},
    	data: {},
      minDate: "2018-01-01",
      maxDate: "2018-02-02",
      selectedDate: today,
      doNothing: false
    };
    this.isLoading=false;
    this.lastDayObj = null;
  }

    updateSubjectList = () => {
    	console.log("Updating");
    	//console.log(this.props.subjectList);
    	this.setState({data: this.props.subjectList});
    }

    _getDays(s, e) {
    var a = [];
    while(s < e) {
      let x = s;
      let fixZero = e => Math.floor(e/10) ==0? "0"+ e:e +"";
      let m = x.getMonth()+1;
      let month = fixZero(m);
      let year = x.getFullYear();
	let date = fixZero(x.getDate());
      let formatDate = [year, month, date].join("-");
        a.push(formatDate);
        s = new Date(s.setDate(
            s.getDate() + 1
        ));
    }
    return a;
    };


      downloadAllSubjects(period, subList, checksum){
          //let subList = this.props.studentStateReducer.enrolledSubject;
	  let scheduleSync = this.scheduleService;
	  console.log("Downloading schedule ", period, subList, checksum);
	  new StudentAPI().downloadSemesterChecksum(
	      subList,
	      checksumData => {
		  if(checksumData){
		      console.log(checksum + " vs " + checksumData.key);
		      if( checksum == null || (checksumData.key != checksum) ){
      			  console.log("ShomeScreen: downloading subjects", subList, period);

      			  new StudentAPI().downloadAllSubjects(subList, r=> {
      			      scheduleSync.generateSchedule(r, period, e=> {
      				           this.props.setSchedule(e); //async
      				           this.props.setSemesterChecksum(checksumData.key);
      				           this.props.asyncStore('semesterChecksum', checksumData.key);
      				           this.props.asyncStore('subjectList', JSON.stringify(e));
      			      });

      			  });
		      }else{
			           console.log("Checksum same");
		      }
		  };
	      });

      }

    componentDidUpdate(){
	//console.log("COMPONENT DID UPDATE", this.props.period, this.props.subList, this.props.checksum);
	let {period, enrolledSubject, semesterChecksum} = this.props;

	if(period && enrolledSubject && semesterChecksum){
	    console.log("COMPONENT DID UPDATE", period, enrolledSubject, semesterChecksum);
	    //this.downloadAllSubjects(period, enrolledSubject, semesterChecksum);
	    //this.props.setSync();
	}

    }


/*
    downloadAllSubjects(period){
        let subList = this.props.enrolledSubject;
	      let scheduleSync = this.props.studentService;

        if(subList.length > 0 && this.props.period != null){
	    console.log("home.index.downloadAllSubject: Downloading the schedule..");
            new StudentAPI().downloadAllSubjects(subList, r => scheduleSync.generateSchedule(r, period, e=>this.props.setSchedule(e) ));
         }else{
           console.log("Please enroll subject");
         }

	if (this.syncState != "sync"){
	    new StudentAPI().downloadAllSubjects(subList, r => scheduleSync.generateSchedule(r, period, e=> {
		this.props.setSchedule(e);
		this.props.setSync();
	    } ));


    /*
    componentDidMount(){
      console.log("COmponent did mount");

      console.log(this.props);
       this.updateSubjectList();


       new StudentAPI().downloadAllSubjects( (r) => {
         let schedule = r;
         let output = {};

         // question 3 should be inside the for loop = permanent
         let permenantClass = schedule.filter(e => e.oldDateTime == null);
         // question 4
         let temporary = schedule.filter(e => e.oldDateTime != null);
         //question 5
         r.
         //generate timetable
         let dateArr=[];//calculate dateArr
         //what day is it? Mon, Tues, Wed
         //add curdate at front end
          for(var i=0; i<dateArr.length; i++){
            //curdate is equal to dateArr[i]
              output[dateArr[i]] = [];
              if(aaa)
                if (sadfsaa)]
                  output[dateArr[i]] = permenant[0];

          }// to generate the dates for agenda

          //UPDATE REDUX TREE tomorr       });
    }
*/

 componentDidMount(){
   if(this.props.period.start_date){
     console.log("Mounting, subject list is:", this.period, this.props.enrolledSubject);
     this.downloadAllSubjects(this.props.period, this.props.enrolledSubject, this.props.semesterChecksum);
  }
 }

    componentWillReceiveProps(newProps){
        if(newProps.period && newProps.period != this.props.period ){
            console.log("Period changed");
            console.log(newProps.period);
        	    this.setState({minDate: newProps.period.start_date,
        			   maxDate: newProps.period.end_date
        			  });
          //TODO: Do this if hash comparison is successfull
            this.downloadAllSubjects(newProps.period, this.props.enrolledSubject, this.props.semesterChecksum);
        }

	if(newProps.enrolledSubject != this.props.enrolledSubject){
	    if(this.props.period){
		//console.log("Schedule updated", this.props.period, newProps.enrolledSubject, this.props.semesterChecksum);
		this.downloadAllSubjects(this.props.period, newProps.enrolledSubject, this.props.semesterChecksum);
	    }

	}
/*	if(newProps.syncState != "sync"){
	    let enrolledSubject = this.props.enrolledSubject;
	    console.log("IN SYNC:", this.props.period, enrolledSubject, this.props.checksum);
	    if(enrolledSubject.length != 0){
		new StudentAPI().downloadSemesterChecksum(enrolledSubject,
							  (checksum) => {
							      console.log("HOMESCREEN UPDATED, CHECKSUM: ", checksum);
							      //this.downloadAllSubjects(newProps.period);


							      //console.log("CHANGED CHECKSUM", this.props.semesterChecksum, newProps.semesterChecksum);
							      /*
							      if(this.props.semesterChecksum == checksum.key){
								  console.log("No need to update timetable");

							      }else{

								  this.downloadAllSubjects(newProps.period);
							      }
							  });
	    }else{
		this.props.setSync();
	    }
	    }*/


    }

    /*
     console.log("Props updated");
    if(hash(newProps.subjectList) != hash(this.props.subjectList)){
        console.log("Redux tree was updated");
        console.log(newProps.subjectList);
        this.setState({data: newProps.subjectList});

    }

if(hash(this.props.period) != hash(newProps.period)){
      this.setState({ minDate: newProps.period.start_date,
                      maxDate: newProps.period.end_date });
      console.log("Updated Period............");
      console.log(newProps.period);
    }*/

    formatDate(date){
	let fixZero = e => Math.floor(e / 10) == 0? "0"+e:e+"";
	let m = date.getMonth()+1;
	let month = fixZero(m);
	return [date.getFullYear(), month,  fixZero(date.getDate()) ].join("-");
    }



    logout(){
	this.props.logout ();
	//this.setState({redirect: true});

    }

    truncateDateString(str){
	let date = new Date(str);

	return this.formatDate(date);
    }

    loadItems(dayObj) {
	this.lastDayObj = dayObj;
	//console.log(dayObj.toDateString());
	//this.loadWeek(new Date(dayObj.timestamp));
	//this.loadMonth(new Date(this.state.selectedDate));
    }

    renderEmptyDate() {
	return (
	    <View style={styles.emptyDate}><Text style={styles.emptyTextStyle}>No Class</Text></View>
	);
    }

  /**
   * TO
   **/
  rowHasChanged(r1, r2) {
    return true;
    ///return (r1.classID   !== r2.classID) || (r1.isCancelled !== r2.isCancelled);
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render () {
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};
    var startDay = this.formatDate(new Date());
      return  (
        <View style={styles.containers}>
             {this.state.redirect?<Redirect to="/login" />:<View/>}
             <View style={styles.titleStlye}>
                 <View style={styles.titleCenterStyle}>
                <Text style={styles.titleTextStyle}>Home</Text>
                </View>
             </View>
             <CustomAgenda

		   doNothing={this.state.doNothing}
		   style={{height: 30}}
		   items={this.props.subjectList}
		   loadItemsForMonth={this.loadItems.bind(this)}
		   selected={this.state.selectedDate}
		   onDayPress={(date)=>{this.setState({
                       selectedDate :  new Date(date.year, date.month-1, date.day)
		   });
             }}
             onDayChange = {(date) => {
                this.setState({
                  selectedDate: new Date(date.year, date.month-1, date.day),
                });
              }}
               // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
               minDate={this.props.period.start_date}
               // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
               maxDate={this.props.period.end_date}
               renderItem={(props)=> <DailyScheduleItem {...props} /> }
               renderEmptyDate={this.renderEmptyDate.bind(this)}
               rowHasChanged={this.rowHasChanged.bind(this)}
               // markingType={'period'}
               markingType={'multi-dot'}
               markedDates={{
               //    '2017-05-08': {textColor: '#666'},
               //    '2017-05-09': {textColor: '#666'},
               //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},

  /*
                 '2018-08-28': {
                   dots: [vacation, massage, workout],
                 },
                 '2018-08-29': {
                   dots: [massage, workout]
                 },*/

               //    '2017-05-22': {endingDay: true, color: 'gray'},
               //    '2017-05-24': {startingDay: true, color: 'gray'},
               //    '2017-05-25': {color: 'gray'},
               //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}

              // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            }}
            theme={{
              backgroundColor: 'rgba(243,129,129,0.9)',
              agendaDayTextColor: 'black',
              agendaDayNumColor: 'black',
              todayBackgroundColor: 'red',
              todayTextColor:'#ffffff'
            }}
         />

        </View>
  );
  }
}


//export default LessonScreen;
const mapStateToProps = p => p.studentStateReducer;

const mapDispatchToProps = dispatch => ({
    setSchedule: (data) => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
    addSubject: (day, obj) => dispatch({type: "ADD_SUBJECT_SCHEDULE", day, obj}),

    setSync: () => dispatch({type: "SYNC_DONE"}),
    setSemesterChecksum: data => dispatch({type: "SET_CHECKSUM", payload: data})

  });

/*
setSchedule: (data) => dispatch({type: "SET_SCHEDULE", weeklySchedule: data}),
addSubject: (day, obj) => dispatch({type: "ADD_SUBJECT_SCHEDULE", day, obj}),
*/
export default connect(mapStateToProps, mapDispatchToProps)(ShomeScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
