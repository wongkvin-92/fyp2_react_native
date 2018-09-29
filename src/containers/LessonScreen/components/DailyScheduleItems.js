import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {styles} from '../style';

const checkBoxTest = () =>{
  alert("hey");
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
          checked={props.checked}
          onPress = {()=>checkBoxTest()}
        />
        :
        <Text style={{color: "red", fontWeight:"900"}}>
        Cancelled
        </Text>
      }
      </View>
    </View>
);

export default DailyScheduleItem;
