import React from 'react';
import{
  Text,
  View,
  StyleSheet,
} from 'react-native';

import{
  Card, Button
} from 'react-native-elements';

import {Redirect, Link} from 'react-router-native';
import {LecturerAPI} from "../../API/index";

import DatePicker from 'react-native-datepicker';

class RescheduleRequest extends React.Component{
  constructor(props){
        super(props);
  let mtoday = this.formatDate(new Date());
  this.state = { datetime1: mtoday};
  }

    formatDate(date){
      let fixZero = e => Math.floor(e / 10) == 0? "0"+e:e+""
      let m = date.getMonth()+1;
      let month = fixZero(m);
      return [date.getFullYear(), month,  fixZero(date.getDate()) ].join("-");
    }
  render () {
    var startDay = this.formatDate(new Date());
    return  (
      <View style={styles.containers}>
        <View style={styles.titleStlye}>
          <Link
                to="/home"
                component={Button}
                rounded
                icon={{name: 'arrow-left', type: 'font-awesome'}}
                buttonStyle= {styles.backBtnStyle}
            />
            <View style={styles.titleCenterStyle}>
              <Text style={styles.titleTextStyle}>Reschedule</Text>
           </View>
        </View>
        <View style={styles.datePickerStyle}>
        <DatePicker
          style={styles.datetimeStyle}
          date={this.state.datetime1}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          minDate={startDay}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,

            }
          }}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({datetime1: datetime});}}
        />
        <View style={styles.canceBtnContainer}>

        <Link
              to="/home"
              component={Button}
              rounded
              title="Submit"
              icon={{name: 'calendar', type: 'font-awesome'}}
              buttonStyle= {styles.rescheduleBtnStyle}
              textStyle = {styles.cancelBtnTextStyle}
                onPress={(goBacktoHome)=>{
                  goBacktoHome.preventDefault();
                    let dateStr = this.state.datetime1;
                    let dtime = dateStr.split(' ');
                    let fdateString = dtime[0];
                    let ftimeString = dtime[1];
                    let id = this.props.match.params.id;


                    new LecturerAPI().requestRescheduleClass(
                      id,
                      fdateString, ftimeString,
                      (r) => {
                          alert(r.msg);
                      }
                    );
                }}
          />

        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',

  },
  titleStlye:{
    paddingTop: 16,
    paddingBottom:16,
    backgroundColor: 'white',
    elevation:4,

  },
  titleTextStyle:{
    fontSize:19,
    fontWeight:"bold",
    color:"black",
    letterSpacing: 2,

  },
  titleCenterStyle: {
    alignSelf: 'center'
  },
  backBtnStyle : {
      position:'absolute',
      padding:5,
      paddingLeft:10,
      paddingRight:0,

  },
  datePickerStyle:{
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: 20,
    fontWeight:'900'
  },
  datetimeStyle:{
    width: 250,
    backgroundColor: 'white',
    borderRadius: 6,

  },
  canceBtnContainer:{
    flexDirection:"row",
    alignItems: "center",
  },
  rescheduleBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(252, 227, 138, 0.9)',
    elevation: 2,
  },
  cancelBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,0,0,0.8)',
    elevation: 2,

  },
  cancelBtnTextStyle:{

    textShadowColor:"orange",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },

})

export default RescheduleRequest;
