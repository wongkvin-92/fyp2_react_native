import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Picker,
  Animated
} from 'react-native';


import {
  Card, Button, PricingCard,
} from 'react-native-elements';


import {Redirect, Link} from 'react-router-native';


class HomeView extends React.Component{

  state={

    fadeAnim: new Animated.Value(0),
    fadeAnim2: new Animated.Value(0)
  };


  componentDidMount() {

      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 2000,              // Make it take a while
        }
      ).start();

      Animated.timing(                  // Animate over time
        this.state.fadeAnim2,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 4000,              // Make it take a while
        }
      ).start();

    }

  render () {

    return  (

        <View style={styles.containers}>


         <View style={styles.titleStlye}>
          <Text style={styles.titleTextStyle}>Home</Text>
         </View>

          <Animated.View style={[{opacity: this.state.fadeAnim}]}>
            <Card
              title="Cancellation"
              titleStyle={styles.cardTitleStyle}
              containerStyle={styles.cardStyle}
                wrapperStyle={styles.innerCardStyle}
            >
              <Text style={styles.cardContentContainerStyle}>
                <Text style={styles.cardContentTitleStyle}> No. of Cancellation: </Text>
                <Text style={styles.cardContentTitle2Style}>7 </Text>

              </Text>
              <View style={styles.viewBtnContainer}>
                <Link
                      to="/lessons"
                      component={Button}
                      title="View"
                      rounded
                      icon={{name: 'visibility'}}
                      buttonStyle= {styles.viewBtnStyle}
                      textStyle = {styles.viewBtnTextStyle}
                /  >
              </View>
            </Card>
          </Animated.View>

          <Animated.View style={[{opacity: this.state.fadeAnim2}]}>
            <Card
              title="Reminder"
              titleStyle={styles.cardTitleStyle}
              containerStyle={styles.cardStyle2}
              wrapperStyle={styles.innerCardStyle2}
            >

              <Text style={styles.cardContentContainerStyle}>
                <Text style={styles.cardContentTitleStyle}> No. of Reschedule: </Text>
                <Text style={styles.cardContentTitle2Style}>7 </Text>
              </Text>

              <View style={styles.viewBtnContainer}>
              <Link
                    to="/reschedule"
                    component={Button}
                    title="View"
                    rounded
                    icon={{name: 'visibility'}}
                    buttonStyle= {styles.viewBtnStyle}
                    textStyle = {styles.viewBtnTextStyle}
              /  >
              </View>
            </Card>
          </Animated.View>
        </View>

  );

  }
}

/*
<Button

  title="View"
  icon={{name: 'visibility'}}
  buttonStyle= {styles.cancelBtnStyle}
  textStyle = {styles.cancelBtnTextStyle}
  />
  */

export default HomeView;
//export default TabNavigator;

const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',
    flexDirection: 'column'
  },

  bodyStyle: {
    width: "100%",
  },

  titleStlye:{
    paddingTop:20,
    paddingLeft:20,
    paddingBottom:16,
    backgroundColor: 'white',
    elevation:4,
  },

  titleTextStyle:{
    fontSize:19,
    fontWeight:"bold",
    color:"black",
        letterSpacing: 2,
  },

  cardBtn1Style:{
    display: 'none'
  },

  cardStyle:{
    elevation: 8,
    marginTop: 20,
    marginBottom: 10
  },

  cardStyle2:{
    elevation: 8,
    marginBottom: 10
  },

  btnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"red",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  cardTitleStyle:{
    fontSize:18,
    color: '#4f9deb',
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  viewBtnContainer:{

  },
  viewBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#4f9deb',
    elevation: 4,

  },
  viewBtnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  },

})
