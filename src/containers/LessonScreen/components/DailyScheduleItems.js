import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {CheckBox, Card} from 'react-native-elements';
import {styles} from '../style';
import {connect} from 'react-redux';

/*
const checkBoxTest = ({checkSubj}) =>{
  //alert("hey");
  checkSubj();
}*/

const DailyScheduleItem = (props) => (

    <View>
    <Card
      title={props.subjectID}
      titleStyle={styles.cardTitleStyle}
      containerStyle={[styles.item, {height: props.height}]}
    >

      <Text style={styles.scheduleContentStyle}>{props.subjectName}</Text>
      <Text style={styles.scheduleContentStyle}>{props.type}</Text>
      <Text style={styles.scheduleContentStyle}>From {props.startTime} to {props.endTime}</Text>

      <View style={styles.canceBtnContainer}>

      {props.isCancelled=="0"?
        <CheckBox
          title='Click Here'
          value={props.checked}
          checked={props.checked}
          onPress = {()=> {
            //
            let temp1  = props.weeklySchedule;
            let keyList = Object.keys(temp1);
            let searchMap = keyList.map(e=>temp1[e]);
            let searchBuffer = [].concat.apply([], searchMap);
            let subject = searchBuffer.find(e => e.classID == props.classID);
            console.log("Class ID"+props.classID);
            console.log(searchBuffer);
            console.log(subject);

            if(subject){
              props.addSubject(subject);
              props.checkSubject();
            }
            //else
          //    console.error("Sorry, error subject not found in the state tree");

                    /*let weekSchedule = Object.keys(props.weeklySchedule).map(e=>props.weeklySchedule[e])；
                    let allClasses = [].concat([], weekSchedule);
                    let subject = allClasses.find(e => e.classID == props.classID);
                    if(subject){
                      props.addSubject(subject);
                    }else
                      console.error("Sorry, error occured");*/
          }}
        />

        :
        <Text style={{color: "red", fontWeight:"900"}}>
        Cancelled
        </Text>

      }

      </View>
     </Card>
    </View>
);

const mapStateToProps = state => state.subjectListReducer;

const mapDispatchToProps = dispatch => ({
  checkSubject: ()=> dispatch({type: "CHECK_SUBJECT"}),
  addSubject: (subject) => dispatch({type: "ADD_CANCEL_SUBJECT", subject}),
  removeSubject: (subject) => dispatch({type: "REMOVE_CANCEL_SUBJECT", subject})
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyScheduleItem);
