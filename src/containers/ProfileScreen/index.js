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
  Animated,
  Modal
} from 'react-native';


import {
  Card, Button, PricingCard,
} from 'react-native-elements';


import {Redirect, Link} from 'react-router-native';

import {LecturerAPI} from "../../API";
import LoginStateCard from "./components/LoginStateCard";


import {connect} from 'react-redux';


const LoginStateCard2 = (props) =>

(<Animated.View style={[{opacity: this.state.fadeAnim}]}>
  <Card
    title="Welcome!!!"
    titleStyle={styles.cardTitleStyle}
    containerStyle={styles.cardStyle}
      wrapperStyle={styles.innerCardStyle}
  >
    <Text style={styles.cardContentContainerStyle}>
      <Text style={styles.cardContentTitleStyle}> Lecturer Name: </Text>
      <Text style={styles.cardContentTitle2Style}>{props.lecturerName} </Text>
    </Text>
  </Card>
</Animated.View>
);

class HomeView extends React.Component{

  state={
    redirect:false,
    fadeAnim: new Animated.Value(0),
    fadeAnim2: new Animated.Value(0),
    lecturerName: "Loading",
    lecturerEmail: "Loading"
  };

  logout(){
      this.props.logout ();
      this.props.dispatchLogout();
      this.setState({redirect: true});
  }

  componentWillMount(){
      new LecturerAPI().fetchProfile( (r) => {
          this.setState({lecturerName: r.lecturerName, lecturerEmail: r.lecturerEmail});
      });
  }

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
             {this.state.redirect?<Redirect to="/login" />:<View/>}

         <View style={styles.titleStlye}>
          <Text style={styles.titleTextStyle}>Profile</Text>
         </View>
         <Animated.View style={[{opacity: this.state.fadeAnim}]}>
          <LoginStateCard lecturerName={this.state.lecturerName} lecturerEmail={this.state.lecturerEmail}/>
         </Animated.View>
            <View style={styles.logoutBtnBackground}>
              <Button rounded
                 title="Logout"
                 onPress={this.logout.bind(this)}
                 buttonStyle= {styles.logoutBtnStyle}
                 textStyle = {styles.btnTextStyle}
                 fontWeight="bold"
               />
             </View>

        </View>
  );
  }
}

//const mapStateToProps= (state) => state.loginStateReducer;

const mapDispatchToProps= (dispatch) => {
  return {
    dispatchLogout: () => dispatch({type: "LOGOUT"})
  };
};

export default connect(null, mapDispatchToProps)(HomeView);
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

  logoutBtnStyle:{
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(243,129,129,0.9)',
    elevation: 2,
      width: '100%',
  },

  btnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"red",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },

  logoutBtnBackground: {
    marginTop:20,
    backgroundColor: 'rgba(252, 227, 138, 0.9)',
    flexDirection:'row',
    justifyContent:'center'
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
