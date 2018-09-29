import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

import {connect} from 'react-redux';

const LoginStateCard = (props) =>
(
  <View>
    <Card
      title="Lecturer"
      titleStyle={styles.cardTitleStyle}
      containerStyle={styles.cardStyle}
    >
      <Text style={styles.cardContentContainerStyle}>
        <Text style={styles.cardContentTitleStyle}>Name: </Text> {props.lecturerName}
      </Text>
      <Text style={styles.cardContentContainerStyle}>
        <Text style={styles.cardContentTitleStyle}>Email: </Text> {props.lecturerEmail}
      </Text>
    </Card>
</View>
);


const ConnectedLoginStateCard = connect( state => state.loginStateReducer)(LoginStateCard);

export default ConnectedLoginStateCard;

const styles = StyleSheet.create({
  cardStyle:{
    elevation: 8,
    marginTop: 20,
    marginBottom: 10,
    borderRadius:6
  },
  cardTitleStyle:{
    fontSize:18,
    color: '#4f9deb',
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  cardContentTitleStyle: {
      fontWeight: "900",
  },

})
