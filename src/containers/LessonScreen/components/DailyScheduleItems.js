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
            props.checkSubject();
            if(props.weeklySchedule){
                      let subject = props.weeklySchedule.find(e => e.classID == props.classID);
                      if(subject){
                        props.addSubject(subject);
                      }else
                        console.error("Sorry, error occured");
          }
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
