import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';


import {
  Card, Button, CheckBox
} from 'react-native-elements';

import CardView from './components/CardView';

import {Redirect, Link} from 'react-router-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LecturerAPI} from "../../API";



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

const DailyScheduleItem = (props) => (



    <View style={[styles.item, {height: props.height}]}>


      <Text>{props.subjectID} - {props.subjectName}</Text>
      <Text>{props.type}</Text>
      <Text>From {props.startTime} to {props.endTime}</Text>
      <View style={styles.canceBtnContainer}>

      {props.isCancelled=="0"?
        <CheckBox
          title='Click Here'
          value={props.checked}
        />
        :
        <Text style={{color: "red", fontWeight:"900"}}>
        Cancelled
        </Text>
      }
      </View>
    </View>
);

class HomeView extends React.Component{
  constructor(props){
    super(props);

    let today = this.formatDate(this.getWeekStart(new Date()));
    this.state={
      redirect:false,
      items: {},
      selectedDate: today
    };
    this.isLoading=false;
  }


  logout(){
      this.props.logout ();
      this.setState({redirect: true});

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
    for(let i=0; i< 7; i++){
      let weekDay = this.getWeekStart(date);
      weekDay.setDate(weekDay.getDate()+i);
      this.fetchSchedule(this.formatDate(weekDay));
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

  componentWillMount(){
    this.loadWeek(new Date());
    //this.loadMonth(new Date());
  }

  truncateDateString(str){
    let date = new Date(str);

    return this.formatDate(date);
  }

  fetchSchedule(day){
    //let obj = this.state.items;
    let obj = {};
    obj[day] = [];
    this.setState({items: obj});
    new LecturerAPI().fetchSchedule(day, (r) => {
        let obj = this.state.items;

        let curDay = this.formatDate(new Date(day));
        console.log(curDay);

        obj[day] =r;
        this.setState({items: obj});
        console.log(this.state.items);
    });
  }

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
  }


  loadItems(dayObj) {
    this.loadWeek(new Date(dayObj.dateString));
    //this.loadMonth(new Date(this.state.selectedDate));
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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

                <Button
                 title="Cancel"
                   rounded
                   icon={{name: 'cancel'}}
                   buttonStyle= {styles.backBtnStyle}
                   textStyle = {styles.cancelBtnTextStyle}
                   onPress={()=> confirmCancel(props.classID, props.curDate) }
                />
             </View>

             <Agenda
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


export default HomeView;


const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',
  },

  bodyStyle: {
    width: "100%",
  },
  pickerStyle:{

  },
  pickerItemStyle:{
    backgroundColor: "red",
    color: "blue",
    fontSize:20,
  },
  titleStlye:{
    paddingTop: 16,
    paddingBottom:16,
    paddingLeft:20,
    backgroundColor: 'white',
    elevation:4,
    flexDirection:'row',

  },
  titleTextStyle:{
    fontSize:19,
    fontWeight:"bold",
    color:"black",
    letterSpacing: 2,

  },
  titleCenterStyle: {
      flex:1,
  },
  backBtnStyle : {
      backgroundColor: 'rgba(252, 227, 138, 0.9)',
      elevation: 2,
      padding: 5,
  },
  logoutBtnStyle:{
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'rgba(243,129,129,0.9)',
    elevation: 2,
  },
  btnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"red",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  logoutBtnBackground: {
    marginTop:20,
    backgroundColor: 'rgba(252, 227, 138, 0.9)',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 20,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    elevation: 10,
    marginBottom:10
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  canceBtnContainer:{
    alignItems: "flex-end",
  },
  cancelBtnStyle:{
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: 'rgba(252, 227, 138, 0.9)',
    elevation: 2,

  },
  cancelBtnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"orange",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  }

})
