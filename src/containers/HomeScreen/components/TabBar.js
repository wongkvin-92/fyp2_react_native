import React from 'react';
import {Dimensions, View} from 'react-native';
import TabButton from "./TabButton";

const containerStyle={
    position: 'absolute',
    height: 30,
    bottom: -Dimensions.get('window').height+49,
    left: 0,
    right: 0,
    container: "flex",
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-evenly"
};


const TabContainer = (props) => (
  <View
    style={containerStyle}
    >
    {props.children}
  </View>
);

class TabBar extends React.Component{

  render(){
    return(
    <TabContainer>
      {
        this.props.tabData.map( (el, id) => (
          <TabButton
            key={id}
            onClick={this.props.onClick}
            {...el}
          />
      ))}
    </TabContainer>
  );
  }
};

export default TabBar;
