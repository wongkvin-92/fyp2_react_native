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

export const CardView = ({title, subName, type, day, time, duration} ) => (
<View>
  <Card
    title={title}
    titleStyle={styles.lessonCardStyle}
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
    <View style={styles.canceBtnContainer}>
      <Button
        rounded
        title="Cancel"
        icon={{name: 'cancel'}}
        buttonStyle= {styles.cancelBtnStyle}
        textStyle = {styles.cancelBtnTextStyle}
      />
    </View>
  </Card>
</View>
)

export default CardView;


const styles = StyleSheet.create({
  lessonCardStyle:{
    fontSize:18
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  cardContentContainerStyle2:{
      fontSize:16,
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
    textShadowColor:"orange",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  },
})
