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

import {styles} from './style';

import {
  Card, Button, PricingCard,
} from 'react-native-elements';


import {Redirect, Link} from 'react-router-native';

import {LecturerAPI} from "../../API";
import LoginStateCard from "./components/LoginStateCard";


import {connect} from 'react-redux';

/*
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
*/
class HomeView extends React.Component{

  state={
    redirect:false,
    fadeAnim: new Animated.Value(0),
    fadeAnim2: new Animated.Value(0),
    studentID: "Loading",
    studentName: "Loading"
  };

  logout(){
      this.props.logout ();
      this.props.dispatchLogout();
      this.setState({redirect: true});
  }

  componentWillMount(){
      new LecturerAPI().fetchProfile( (r) => {
          this.setState({studentName: r.lecturerName, studentID: r.lecturerEmail});
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
          <Text style={styles.titleTextStyle}>Home</Text>
         </View>
         <View style={styles.loginCardStyle}>
         <Animated.View style={[{opacity: this.state.fadeAnim}]}>
          <LoginStateCard studentName={this.state.studentName} studentID={this.state.studentID}/>
         </Animated.View>
         <Animated.View style={[{opacity: this.state.fadeAnim}]}>
         <Card
           title="Class Cancellation & Rescheduling"
           titleStyle={styles.cardTitleStyle}
           containerStyle={styles.cardStyle}
             wrapperStyle={styles.innerCardStyle}
         >
         <Text style={styles.cardContentContainerStyle}>
           <Text style={{fontWeight:"900"}}>
              No. of Cancel & Rescheduling: </Text>
           <Text style={{fontWeight:"100", color:"red"}}> 7</Text>
         </Text>

           <View style={styles.viewBtnContainer}>
             <Link
                   to="/studentcreate"
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
