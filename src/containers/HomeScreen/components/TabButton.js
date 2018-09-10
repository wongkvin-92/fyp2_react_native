import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const btnStyle = {
  backgroundColor: "pink",
  paddingLeft: 30,
  paddingRight: 30
};

const TabButton = ({label, id, onClick}) => (
     <TouchableOpacity
      style={btnStyle}
      onPress={()=>onClick(id)}
     >
     <Text>{label}</Text>
    </TouchableOpacity>
);

export default TabButton;
