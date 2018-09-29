import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Animated} from 'react-native';

  import {RedirectTo, NativeRouter, Route, Link} from 'react-router-native';

import {
  Button,
  FormLabel, FormInput, Grid, Row, Col
} from 'react-native-elements';

import {LecturerAPI} from "../../API";
import {Redirect} from 'react-router-native';
import {connect} from 'react-redux';


class LoginView extends React.Component{
  state={
    email: "seethal@help.edu.my",
    password: "123456",
    loginState: "NONE",
    redirect: false,
    fadeAnim: new Animated.Value(0),
  //  springAnim: new Animated.Value(0)
  };

componentWillReceiveProps(newProps){
  if(newProps.isLoggedIn != this.props.isLoggedIn){
      this.setState({redirect: newProps.isLoggedIn});
  }
}

 /*

    componentWillMount(){
      new LecturerAPI().checkLoginState(
        () => {
          this.setState({loginState: "logged in"});
          this.props.setLogin({
          type: "lecturer"
        })
      },
        () => this.setState({loginState: "Not logged in"})
      );
    }
    {this.props.isLoggedIn==false?<View />:<Redirect to="/home" />}

*/

componentDidMount() {
  console.log("Im hhere");
  console.log(this.props);
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1700,              // Make it take a while
      }
    ).start();
/*
    Animated.spring(
      this.state.springAnim,{
        toValue: 1,
        friction: 0.8
      }).start();                    // Starts the animation
      */
  }


  render (){
    return (

      <View style={styles.containers}>

        <View style={styles.topStyle}>
        </View>
        <View style={styles.middleStyle}>
        </View>
        <View style={styles.footerStyle}>
        </View>


        {this.state.redirect?<Redirect to="/home" />:<View/>}

       <Animated.View
          style={[styles.formStyle,
          {opacity: this.state.fadeAnim}]}
          //{transform:[{scale: this.state.springAnim}]}
      >
        <View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.logoContainer}>
              <Image
                    style={styles.logo}
                    source={require('../../images/loginLogo_1.png')}
              />
            </View>

            <FormLabel >Email</FormLabel>
            <FormInput
             returnKeyType="next"
              keyboardType="email-address"
              textInputRef='email'

              onChangeText={ t=> this.setState({email: t}) }
              value={this.state.email}
              containerStyle= {{
                'borderWidth': 0.5,
                'borderColor': 'white',
                'borderBottomColor': 'black',
              }}
             />

            <FormLabel>Password</FormLabel>
            <FormInput
              returnKeyType="go"
              secureTextEntry={true}
              textInputRef='password'

              onChangeText={ t=> this.setState({password: t}) }
              value={this.state.password}
              containerStyle= {{
                'borderWidth': 0.5,
                'borderColor': 'white',
                'borderBottomColor': 'black'
              }}
             />

            <View style={styles.loginBtnContainer}>
              <Button
                title="Login"
                onPress = {
                  () => {
                    new LecturerAPI().login(
                      this.state.email,
                      this.state.password,
                      (r) => {
                        alert(r.msg);
                        this.props.login();
                        this.props.dispatchLogin(this.state.email, r.id);
                        //this.setState({redirect:true})
                      }
                    )
                  }
                }

                rounded
                icon={{name: 'input'}}
                buttonStyle= {styles.loginBtnStyle}
               textStyle = {styles.btnTextStyle}
               fontWeight="bold"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    </View>

    );
  }
}



const styles = StyleSheet.create({

  containers: {
    height: "100%",
    justifyContent: 'center',
    flexDirection:'column',
  },
  footerStyle: {
      backgroundColor: 'rgba(252, 227, 138, 0.9)',
      flex:1,
  },
  middleStyle: {
        backgroundColor: 'rgba(243,129,129,0.9)',
        flex:4,
  },
  topStyle: {
      backgroundColor: 'rgba(252, 227, 138, 0.9)',
      flex:1,
  },
  formStyle: {
    position: 'absolute',
    backgroundColor:'white',
    width: "95%",
    marginLeft:10,
    marginBottom:10,
    'borderWidth': 10,
    'borderColor': 'rgb(241,114,125)',
    'borderTopColor': 'rgba(252, 227, 138, 0.9)',
    'borderBottomColor': 'rgba(252, 227, 138, 0.9)',
     elevation: 24,

  },
  loginBtnStyle: {
    backgroundColor: 'rgba(243,129,129,0.9)',
    elevation: 2,
    width: '100%'
  },
  loginBtnContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection:'row',
    justifyContent:'center'
  },

  logoContainer: {
    alignItems : 'center',
  },
  btnTextStyle:{
    fontFamily: "Roboto",
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  }
});

const mapStateToProps = (state) => state.loginStateReducer;
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (email, lecturerID) => dispatch({type: "LOGIN", email: email, lecturerID: lecturerID})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
