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
      <Text style={styles.cardContentTitleStyle}>Ori. Day: </Text> {oriDay}
    </Text>
    <Text style={styles.cardContentContainerStyle2}>
      <Text style={styles.cardContentTitleStyle}>Date Cancelled: </Text> {cancelDate}
    </Text>
    {newDateTime==null?<Text>No replacement class set</Text>:<Text>Replacement class is set on date {newDateTime}
    </Text>}
    {newDateTime!=null&&status=="approved"?<Text>approved by admin, venue: {newVenue}</Text>:<Text>but not approved by admin</Text>}

    <View style={styles.canceBtnContainer}>

      <Link
            to="/request"
            component={Button}
            rounded
            title="Reschedule"
            icon={{name: 'calendar', type: 'font-awesome'}}
            buttonStyle= {styles.rescheduleBtnStyle}
            textStyle = {styles.cancelBtnTextStyle}
      /  >
      <Button
        rounded
        title=""
        icon={{name: 'trash', type: 'font-awesome'}}
        buttonStyle= {styles.cancelBtnStyle}
        textStyle = {styles.cancelBtnTextStyle}
        onPress={
          () => {
            new LecturerAPI().deleteCancellationRequest(rescheduleID, (response)=>{
              alert(response.msg);
            })
          }
        }
      />
    </View>
  </Card>
</View>
)

export default LessonCard;


const styles = StyleSheet.create({
  cardStyle: {
    elevation: 8,
      marginBottom:10
  },
  lessonCardStyle:{
    fontSize:18,
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  cardContentContainerStyle2:{
      fontSize:16,
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
    fontFamily: "Roboto",
    textShadowColor:"orange",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
})
