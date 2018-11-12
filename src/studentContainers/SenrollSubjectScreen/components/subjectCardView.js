import React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';


import {
  Card, Button
} from 'react-native-elements';

import {Redirect, Link} from 'react-router-native';

import {StudentAPI} from '../../../API';

export const SubjectCard = ({subjectID, subjectName, clickHandler=()=>{}, enrolledStatus, removeHandler=()=>{}} ) => (
<View>

  <Card
    title={subjectID}
    titleStyle={styles.lessonCardStyle}
    containerStyle={styles.cardStyle}
  >
    <Text>{enrolledStatus?"Enrolled":"Not enrolled"}</Text>
    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}>Subject Name: </Text>{subjectName}
    </Text>

    {enrolledStatus?
	<Button
	      title="Unenroll"
	      rounded
	      icon={{name: 'remove'}}
	      buttonStyle= {{...styles.cancelBtnStyle, backgroundColor: "rgba(92, 99,216, 1)"}}
		  textStyle = {styles.cancelBtnTextStyle}      
		  onPress={(event)=> removeHandler(subjectID, event) }      
	  />
	:
    <Button
      title="Enroll"
       rounded
       icon={{name: 'add'}}
       buttonStyle= {styles.cancelBtnStyle}
      textStyle = {styles.cancelBtnTextStyle}      
      onPress={(event)=> clickHandler(subjectID, event) }      
	  />
      }

  </Card>
</View>
)

export default SubjectCard;


const styles = StyleSheet.create({
  cardStyle: {
    elevation: 8,
    marginBottom:10,
    borderRadius: 6
  },
  lessonCardStyle:{
    fontSize:18,
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  cardContentContainerStyle2:{
      fontSize:12,
      marginBottom:10,
      position: "absolute",
      alignSelf: "flex-end",
      alignItems: "center",
  },
  cardContentTitleStyle: {
      fontWeight: "900",

  },
  canceBtnContainer:{
    alignItems: "flex-end",
  },
  rescheduleBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#4f9deb',
    elevation: 2,
  },
  cancelBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,0,0,0.8)',
    elevation: 2,

  },
  cancelBtnTextStyle:{
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight: "900",
  },
})
