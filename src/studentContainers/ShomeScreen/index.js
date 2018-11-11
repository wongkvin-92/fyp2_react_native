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
      let date = fixZero(x.getDate())
      let formatDate = [year, month, date].join("-");
        a.push(formatDate);
        s = new Date(s.setDate(
            s.getDate() + 1
        ));
    }
    return a;
    };

    //new function call it in componentdidmount
    //updateSubjectSem = (success) =>
    generateSchedule = (r) => {
      let allSchedule = r;

      let convertToDate = (strDate) => {
        let d = strDate.split("-").map(x => parseInt(x));
        return new Date(d[0], d[1]-1, d[2]);
      };
      let getWeekDay = (strDate) => {
        let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekDay[convertToDate(strDate).getDay()];
      };

    //let d1 = this.props.period.start_date.split("-").map(e=>parseInt(e));
    //let d2 = this.props.period.end_date.split("-").map(e=>parseInt(e));

    //let startDate = new Date(d1[0], d1[1]-1,d1[2]);
    //let endDate = new Date(d2[0], d2[1]-1, d2[2]);
	//endDate.setMonth(endDate.getMonth()+2);
	let startDate = convertToDate(this.props.period.start_date);
	let endDate  = this.props.period.end_date;

    let dateArr = this._getDays(new Date(startDate), new Date(endDate));

    let emptySchedules ={};
      let newSchedule = {};
      dateArr.forEach( el => emptySchedules[el]=[]);

	let permenantSchedule = {};
	let replacementClasses = {};
	let cancelledClasses = {};


      console.log("GET WEEK.........");
      //console.log(dateArr.map(getWeekDay));
      dateArr.forEach(el => {
        permenantSchedule[el] = allSchedule.filter(d =>
          d.oldDateTime == null && d.day == getWeekDay(el)
        );
          replacementClasses[el] = allSchedule.filter(d =>
						      d.newDateTime != null && d.newDateTime == el  && d.status=="approved"
						     );

          cancelledClasses[el] = allSchedule.filter(d =>
						    d.oldDateTime != null && d.oldDateTime == el
						   ).map(e => parseInt(e.classID));
      }
		     );
	//let finalSchedule = {...permenantSchedule, ...replacementClasses};
	let finalSchedule = {};
	Object.keys(permenantSchedule).forEach( k => {
	    let combinedSchedule = permenantSchedule[k].concat(replacementClasses[k]);

	    //finalSchedule[k]['isCancelled'] = true; //TODO
	    finalSchedule[k] = Object.values(combinedSchedule).map( j => {
        const jCopy = {...j};
        let classID = j['classID']
        var isCancelled = cancelledClasses[k].includes(parseInt(classID));
        //jCopy['isCancelled'] = cancelledClasses[k].includes(parseInt(classID));
        jCopy['isCancelled'] = isCancelled;
        jCopy['curDate'] = k;
        //let a = j;
        //j['wKvin'] = 'here';
    		//finalSchedule[k][j]['isCancelled'] = cancelledClasses[k].indexOf(parseInt(finalSchedule[k][j]['classID'])) >= 0; // finalSchedule[k][j] in cancelledClasses;
    		//finalSchedule[k][j]['curDate'] = k;
        //console.log(	finalSchedule[k][j]['isCancelled']);
        return jCopy;
	    });
	});

	this.props.setSchedule(finalSchedule);
    };




    downloadAllSubjects(){
         let subList = this.props.enrolledSubject;
         if(subList.length > 0){
           new StudentAPI().downloadAllSubjects(subList, this.generateSchedule);
         }else{
           console.log("Please enroll subject");
         }
    }


    componentDidUpdate(){
      console.log(this.props.subjectList);
    }

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


    componentWillReceiveProps(newProps){
        if(newProps.period != this.props.period){
            console.log("Period changed");
            console.log(newProps.period);
        	    this.setState({minDate: newProps.period.start_date,
        			   maxDate: newProps.period.end_date
        			  });
          //TODO: Do this if hash comparison is successfull
          this.downloadAllSubjects();
        }
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
             { this.state.data.length == 0? <View><Text> Please enroll a subject</Text></View>
		 :
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
               minDate={this.state.minDate}
               // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
               maxDate={this.state.maxDate}
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
       }
        </View>
  );
  }
}


//export default LessonScreen;
const mapStateToProps = p => p.studentStateReducer;

const mapDispatchToProps = dispatch => ({
    setSchedule: (data) => dispatch({type: "UPDATE_SCHEDULE", subjectList: data}),
    addSubject: (day, obj) => dispatch({type: "ADD_SUBJECT_SCHEDULE", day, obj})

  });

/*
setSchedule: (data) => dispatch({type: "SET_SCHEDULE", weeklySchedule: data}),
addSubject: (day, obj) => dispatch({type: "ADD_SUBJECT_SCHEDULE", day, obj}),
*/
export default connect(mapStateToProps, mapDispatchToProps)(ShomeScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
