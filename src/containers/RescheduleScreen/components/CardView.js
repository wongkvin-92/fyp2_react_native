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
} from 'react-native-elements'

export const LessonCard = ({title, subName, type, day, time, duration} ) => (
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
      <Text style={styles.cardContentTitleStyle}>Day: </Text> {day}
    </Text>
    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}>Time: </Text> {time}
    </Text>
    <Text style={styles.cardContentContainerStyle2}>
      <Text style={styles.cardContentTitleStyle}>Duration: </Text> {duration}
    </Text>

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
})
