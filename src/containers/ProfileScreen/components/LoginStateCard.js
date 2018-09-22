import React from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';

const LoginStateCard = (props) =>
(
  <View>
<Text>{props.lecturerName}</Text>
<Text>{props.email}</Text>
</View>
);


const ConnectedLoginStateCard = connect( state => state.loginStateReducer)(LoginStateCard);

export default ConnectedLoginStateCard;
