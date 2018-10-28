import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

import {connect} from 'react-redux';

import {styles} from '../style';

const LoginStateCard = (props) =>
(
  <View>
    <Card
      title={props.type=="lecturer"?"Lecturer":"Student"}
      titleStyle={styles.cardTitleStyle}
      containerStyle={styles.cardStyle}
    >
      <Text style={styles.cardContentContainerStyle}>
        <Text style={styles.cardContentTitleStyle}>Name: </Text> {props.name}
      </Text>
      <Text style={styles.cardContentContainerStyle}>
        <Text style={styles.cardContentTitleStyle}>Email: </Text> {props.email}
      </Text>
    </Card>
</View>
);

export default LoginStateCard;
