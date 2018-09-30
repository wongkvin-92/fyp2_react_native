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

import CardView from './components/CardView';

import {Redirect, Link} from 'react-router-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LecturerAPI} from "../../API";

import {styles} from './style';
import DailyScheduleItem from './components/DailyScheduleItems';

const cancelLesson = (classId, date) => {
  new LecturerAPI().cancelLesson(classId, date, (r) => {
    alert(r.msg);

  });
};


const confirmCancel = (classId, date) => {
  Alert.alert(
  'Confirm Cancel',
  'Are you sure you want to cancel class',
  [
    {text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: ()=>cancelLesson(classId, date) },
  ],
  { cancelable: false }
  );
}

class LessonScreen extends React.PureComponent{
  constructor(props){
    super(props);

    let today = this.formatDate(this.getWeekStart(new Date()));
    this.state={
      redirect:false,
      items: {},
      selectedDate: today,
      checked: false,
      showCancelButton: false
    };
    this.isLoading=false;
  }


  componentWillMount(){
    //this.setState({showCancelButton: })
    //this.loadWeek(new Date());
    //this.loadMonth(new Date());
  }

  componentWillReceiveProps(newProps){
    if(this.props.subjectListChecked != newProps.subjectListChecked){
      this.setState({showCancelButton: newProps.subjectListChecked});
    }

    if(this.props.itemsPending != newProps.itemsPending){
        if(newProps.itemsPending == 0){
          this.props.stopDownload();
          this.setState({items: newProps.weeklySchedule});
        }
    }
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
    let fixZero = e => Math.floor(e / 10) == 0? "0"+e:e+""
    let m = date.getMonth()+1;
    let month = fixZero(m);
    return [date.getFullYear(), month,  fixZero(date.getDate()) ].join("-");
  }

  loadWeek(date){
    if(this.props.downloadingSchedule == false){
        this.props.startDownload(7);
        for(let i=0; i< 7; i++){
          let weekDay = this.getWeekStart(date);
          weekDay.setDate(weekDay.getDate()+i);
          console.log(weekDay);
          this.fetchSchedule(this.formatDate(weekDay));
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
    this.loadWeek(new Date(dayObj.dateString));
    //this.loadMonth(new Date(this.state.selectedDate));
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text style={{color:'red', fontWeight:'900'}}>No Class</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }



  render () {
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};

    return  (

        <View style={styles.containers}>
             {this.state.redirect?<Redirect to="/login" />:<View/>}
             <View style={styles.titleStlye}>

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
                   onPress={()=> confirmCancel(props.classID, props.curDate) }
                />
                :<View/>}
             </View>

             <Agenda
              style={{height: 30}}
               items={this.state.items}
               loadItemsForMonth={this.loadItems.bind(this)}
               selected={this.state.selectedDate}
               // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
               minDate={'2018-08-01'}
               // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
               maxDate={'2018-11-30'}
               renderItem={(props) => <DailyScheduleItem {...props} /> }
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
    stopDownload: () => dispatch({type: "STOP_DOWNLOAD"})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
