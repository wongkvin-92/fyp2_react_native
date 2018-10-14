import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

import {connect} from 'react-redux';

import {styles} from '../style';

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
