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

export const LessonCard = ({rescheduleID, title, subName, type, oriDate, oriDay, newDateTime, status, newVenue} ) => (
<View>

  <Card
    title={title}
    titleStyle={styles.lessonCardStyle}
    containerStyle={styles.cardStyle}
  >

    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}>Subject Name: </Text>{subName}
    </Text>

    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}>Type: </Text> {type}
    </Text>

    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}>Ori. Date: </Text> {oriDate}
    </Text>

    <Text style={styles.cardContentContainerStyle}>
      {newDateTime!=null&&status=="approved"?
      <Text >
      <Text style={styles.cardContentTitleStyle}>
        Replacement: </Text><Text style={{color: "blue"}}> {newDateTime} </Text>
       </Text>
      :

      <Text style={{color: "red", fontWeight:"900"}}>
        No replacement yet</Text>

     }
    </Text>

      {newDateTime!=null&&status=="approved"?
        <Text style={styles.cardContentContainerStyle}>
          <Text style={{color: 'blue', fontWeight: '900'}}>
            New Venue: {newVenue}
          </Text>
        </Text>
      :<Text></Text>}

  </Card>
</View>
)

export default LessonCard;


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
