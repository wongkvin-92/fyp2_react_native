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

import {LecturerAPI} from '../../../API';

export const LessonCard = ({rescheduleID, title, subName, type, oriDate, oriDay, cancelDate, newDateTime, status, newVenue} ) => (
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
      <Text style={styles.cardContentTitleStyle}>Date Cancelled: </Text> {cancelDate}
    </Text>

    <Text style={styles.cardContentContainerStyle}>
      {newDateTime==null?
        <Text style={styles.cardContentTitleStyle}>
          No replacement class set</Text>
      :<Text style={styles.cardContentTitleStyle}>
        Replacement date:
         <Text style={{fontWeight:"100"}}>
          {newDateTime}
         </Text>
       </Text>}
    </Text>

    <Text style={styles.cardContentContainerStyle2}>
      {newDateTime!=null&&status=="approved"?<Text style={{color: 'blue', fontWeight: '900'}}>Approved</Text>:<Text style={{color: 'red', fontWeight: '900'}}>Pending</Text>}
    </Text>

      {newDateTime!=null&&status=="approved"?
        <Text style={styles.cardContentContainerStyle}>
          <Text style={{color: 'blue', fontWeight: '900'}}>
            New Venue: {newVenue}
          </Text>
        </Text>
      :<Text></Text>}

      {newDateTime!=null?
        <View></View>
        :  <View style={styles.canceBtnContainer}>
             <Link
                to={"/request/"+rescheduleID}
                    component={Button}
                    rounded
                    title="Reschedule"
                    icon={{name: 'calendar', type: 'font-awesome'}}
                    buttonStyle= {styles.rescheduleBtnStyle}
                    textStyle = {styles.cancelBtnTextStyle}
             />
          </View>
      }

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
