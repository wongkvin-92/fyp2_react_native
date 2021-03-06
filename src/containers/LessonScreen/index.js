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
import {LecturerAPI, StudentAPI} from "../../API";
import {UserAPI} from "../../API";
import {styles} from './style';
import DailyScheduleItem from './components/DailyScheduleItems';

import {scheduleSyncServices} from '../../services';

const cancelLesson = (cancelList, callback) => {
  let dataList = Object.keys(cancelList).map(i => ({"classID": cancelList[i].classID, "cancelDate": cancelList[i].curDate}) )
  new LecturerAPI().cancelLessonList(dataList, (r) =>{
    callback();
    alert(r.msg);
  });

};


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


const confirmCancel = (cancelList, callback) => {
  Alert.alert(
  'Confirm Cancel',
  'Are you sure you want to cancel class?',
  [
    {text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: ()=>cancelLesson(cancelList, callback) },
  ],
  { cancelable: false }
  );
}

class LessonScreen extends React.PureComponent{
  constructor(props){
    super(props);
      this.scheduleService = new scheduleSyncServices.StudentScheduleSystem({});
    let today = this.formatDate(new Date());
    this.state={

      redirect:false,
      items: {},
      selectedDate: today,
      checked: false,
      showCancelButton: false,
      doNothing: false,
      minDate: props.period.start_date,
      maxDate: props.period.end_date
    };
    this.isLoading=false;
    this.lastDayObj = null;
  }

  downloadSemStartEnd =() =>{
    new UserAPI().downloadSemester(
      (d) => this.setState({
        minDate: d.start_date,
        maxDate: d.end_date
      })
    )
  }

    //Download the schedule for the lecturer
    downloadSchedule(){
	     new LecturerAPI().downloadSchedule( schedule =>
					    this.scheduleService.generateSchedule(schedule, {start_date: this.state.minDate, end_date: this.state.maxDate }, e => {
						this.setState({items: e});
						console.log("Schedule", e);
					    })
					  );

    }

    componentDidMount(){
      this.props.addEventListener( 'updateLecSchedule', ()=>{
        this.downloadSchedule();
      });
	//new LecturerAPI().downloadScheduleHash( hash => {
	//    console.log("Hash downloaded from server = ", hash);
	//});
	this.downloadSchedule();
      //this.downloadSemStartEnd();
     // new StudentAPI().downloadAllSubjects(['bit100'],
	//				   schedule =>
	//				   {

					       //console.log("schedule", schedule);

					       /*
					       this.scheduleService.generateSchedule(schedule, {start_date: "2018-08-10", end_date: "2018-12-28" }, e => {
					       this.setState({items: e});
					       console.log("Schedule", e);
					       });*/
	//				   }
      //				  );

      //this.setState
  }

  refreshSchedule(){
    this.downloadSchedule();
  }

 componentWillMount(){
   console.log("MOUNTING STUDENT HOMESCREEN ", this.props);
   this.props.addEventListener('refreshLecturerSchedule', ()=>{
     console.log("ComponentDidMount.refreshSchedule(): Downloading all subjects again...");
     this.refreshSchedule();
     //this.downloadAllSubjects(this.props.period, this.props.enrolledSubject, this.props.semesterChecksum);
  });
 }


  componentWillReceiveProps(newProps){

    if(newProps.period && newProps.period != this.props.period ){
        console.log("Period changed");
        console.log(newProps.period);
          this.setState({minDate: newProps.period.start_date,
             maxDate: newProps.period.end_date
            });
    }

    if(this.props.subjectListChecked != newProps.subjectListChecked){
      this.setState({showCancelButton: newProps.subjectListChecked});
    }

    if(this.props.itemsPending != newProps.itemsPending){
        if(newProps.itemsPending == 0){
          this.props.stopDownload();
          this.setState({items: newProps.weeklySchedule});
        }
    }
    if(this.props.forceReload != newProps.forceReload){
      if(newProps.forceReload == true){
        //this.setState({doNothing: !this.state.doNothing});
       //this.loadItems(this.state.selectedDate);
       console.log("Forcing reload...");
       this.setState({items: newProps.weeklySchedule});
        newProps.done_reload(); //update redux tre
      }
    }
    //if(this.props.cancelList != newProps.cancelList){

    //}
  }


  logout(){
      this.props.logout ();
      //this.setState({redirect: true});

  }

  getWeekStart(today){
    let sundayDate = today.getDate() - today.getDay();
    today.setDate(sundayDate);
    return today;
  }

  formatDate(date){
      let fixZero = e => Math.floor(e / 10) == 0? "0"+e:e+"";
    let m = date.getMonth()+1;
    let month = fixZero(m);
    return [date.getFullYear(), month,  fixZero(date.getDate()) ].join("-");
  }

  loadWeek(date){
    let weekStart = this.getWeekStart(date);
    let prevWeekStart = new Date(this.props.weekStart);

    if(this.props.downloadingSchedule == false){
      let cond2 = (this.props.weekStart != null) && (weekStart.toDateString() != prevWeekStart.toDateString());

      if(this.props.weekStart == null || cond2){
        //download schedule
        this.props.setWeekStart(weekStart.toDateString());
        this.props.startDownload(7);

        //console.log("WEEK_START IS ");
        //console.log(week);
        for(let i=0; i< 7; i++){
            let weekDay = this.getWeekStart(date);
            weekDay.setDate(weekDay.getDate()+i);
            console.log(weekDay);
            this.fetchSchedule(this.formatDate(weekDay));
          }
        }
      }
  }

  loadMonth(date){
    let newDate = new Date(date);

    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    //this.setState({item: {}});

/*
    for(date=today; date< lastDayOfMonth; date++){
      newDate.setDate(date);
      this.fetchSchedule(this.formatDate(newDate));
    }
*/
    /*for(let i=0; i< 7; i++){
      let weekDay = this.getWeekStart(date);
      weekDay.setDate(weekDay.getDate()+i);
      this.fetchSchedule(this.formatDate(weekDay));
    }*/
  }


  truncateDateString(str){
    let date = new Date(str);

    return this.formatDate(date);
  }

  fetchSchedule(day){
    //let obj = this.state.items;
    let obj = {};
    obj[day] = [];
    //this.setState({items: obj});
    //this.props.setSchedule(obj);
    new LecturerAPI().fetchSchedule(day, (r) => {

        //let obj = this.state.items;

        let curDay = this.formatDate(new Date(day));

        this.props.addSubject(curDay, r);
        //this.props.setSchedule(obj);
        //this.setState({items: obj});

    });
  }

/*
  fetchSchedule2(day){
    let obj = this.state.items;
    obj[day] = [];
    this.dateBuffer = [];
    this.isLoading = true;

    new LecturerAPI().fetchSchedule(day, (r) => {
        let obj = this.state.items;

        let curDay = this.formatDate(new Date(day));
        console.log(curDay);

        obj[day] =r;
        this.dateBuffer.append(obj);
    });
  }*/


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
             <Link
                   to="/home"
                   component={Button}
                   rounded
                   icon={{name: 'arrow-left', type: 'font-awesome'}}
                   buttonStyle= {styles.backBtnStyle}
               />
                 <View style={styles.titleCenterStyle}>
                <Text style={styles.titleTextStyle}>Lesson</Text>
                </View>

          {this.state.showCancelButton==true?

            <Button
              title="Cancel"
               rounded
               icon={{name: 'cancel'}}
               buttonStyle= {styles.cancelBtnStyle}
               textStyle = {styles.cancelBtnTextStyle}
               onPress={()=> {
                 confirmCancel(this.props.cancelList, ()=>{
                   this.props.clearCancelList();
                   this.refreshSchedule();
                   //this.props.force_reload();
                 });
               }}
            />
                :<View/>}
             </View>

             <CustomAgenda
              doNothing={this.state.doNothing}
              style={{height: 30}}
               items={this.state.items}

               selected={this.state.selectedDate}
               onDayPress={(date)=>{this.setState({
                 selectedDate :  new Date(date.year, date.month-1, date.day)
               })
             }}
             onDayChange = {() => {

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

        </View>
  );
  }
}


//export default LessonScreen;
const mapStateToProps = p => p.subjectListReducer;
const mapDispatchToProps = dispatch => {
  return {
    setSchedule: (data) => dispatch({type: "SET_SCHEDULE", weeklySchedule: data}),
    addSubject: (day, obj) => dispatch({type: "ADD_SUBJECT_SCHEDULE", day, obj}),
    startDownload: (count) => dispatch({type: "START_DOWNLOAD", itemsPending: count}),
    stopDownload: () => dispatch({type: "STOP_DOWNLOAD"}),
    setWeekStart: (date) => dispatch({type: "SET_WEEK_START", weekStart: date}),
    clearCancelList: () => dispatch({type: "REMOVE_ALL_LIST"}),
    done_reload: ()=>dispatch({type: "AFTER_RELOAD"}),
    force_reload: ()=>dispatch({type: "FORCE_RELOAD"})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
