import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Animated} from 'react-native';

  import {RedirectTo, NativeRouter, Route, Link} from 'react-router-native';

import {
  Button,
  FormLabel, FormInput, Grid, Row, Col,FormValidationMessage
} from 'react-native-elements';

//import Store from 'react-native-store';

import {LecturerAPI,UserAPI} from "../../API";
import {Redirect} from 'react-router-native';
import {connect} from 'react-redux';


/*const DB ={
  'studentTest' : Store.model('studentTest')
}*/

class LoginView extends React.Component{
  state={
      email: "",
      password: "",
      loginState: "NONE",
      redirect: false,
      fadeAnim: new Animated.Value(0),
      bbc:"black",
      bbc2:"black",
      error: false,
      error2: false,
      errorMsg:"",
      errorMsg2:"",
       studentTest: []
      //  springAnim: new Animated.Value(0)
  };

    componentWillReceiveProps(newProps){
	if(newProps.loginStateReducer.isLoggedIn != this.props.loginStateReducer.isLoggedIn){
	    this.setState({redirect: newProps.loginStateReducer.isLoggedIn});
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

    /*DB.studentTest.add({
       studentID: '1234',
       name: "Ibrahim"
    });

    DB.studentTest.find().then(resp => this.setState({studentTest: resp}));
    console.log("State");
    console.log(DB);
    console.log(this.state.studentTest);
    */

}
    /*
       handleOnPress = () => {
       pushNotifications.localNotification();
       };

     */

    wrongInputValidate = (e) => {
    this.setState({
      bbc: "red"

    })
  }
  wrongInputValidate2 = (e) => {
    this.setState({
      bbc2: "red",
      error: true
    })
  }

    correctInputValidate = (e) => {
      this.setState({
        bbc: "green"
      })
    }

    correctInputValidate2 = (e) => {
      this.setState({
        bbc2: "green"
      })
    }

    onLoginPress = () => {
	//alert("Login button pressed!");
	new UserAPI().login(
	    this.state.email,
	    this.state.password,
	    (response) => {
		//alert(response);
		if(response.result == true){
		    this.props.login();

        let credential = response.credentials;
        let period = response.sem;
		    this.props.asyncStore('credentials', JSON.stringify(credential));


        if(  (JSON.stringify(this.props.studentStateReducer.period) != JSON.stringify(response.sem)) )
        {
          this.props.asyncStore('period', JSON.stringify(period));
          this.props.setPeriod(response.sem);
        }

		    this.props.dispatchLogin(response.credentials);
        alert(response.msg);
		}else{
		    if(this.state.email ==""){
    			this.wrongInputValidate();
    			this.setState({
    			    errorMsg: response.msg,
    			    error: true
			    });
        }
		    else if(this.state.password ==""){
    			this.correctInputValidate();
    			this.wrongInputValidate2();
    			this.setState({
    			    errorMsg:"",
    			    errorMsg2: response.msg,
    			    error2: true
			   });
		    }
		    else{
    			//console.log("ERROR", response);
    			//errorMsg2: r.msg;
    			this.setState({
    			    errorMsg:"",
    			    errorMsg2: response.msg,
    			    error2: true
    			});
		     }
       }

     },
     (response) => {
       this.setState({
           errorMsg:"",
           errorMsg2: "Unable to connect to the server!",
           error2: true
       });
     }
   );
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
              shake={!this.state.error ? false : true}
              onChangeText={ t=> this.setState({email: t}) }
              value={this.state.email}
              containerStyle= {
                [styles.formInputStyle,
                {'borderBottomColor': this.state.bbc}]
              }
             />
             <FormValidationMessage>{this.state.errorMsg}</FormValidationMessage>
            <FormLabel>Password</FormLabel>
            <FormInput
              returnKeyType="go"
              secureTextEntry={true}
              textInputRef='password'
              shake={!this.state.error2 ? false : true}
              onChangeText={ t=> this.setState({password: t}) }
              value={this.state.password}
              containerStyle= {
              [styles.formInputStyle,
                {'borderBottomColor': this.state.bbc2}]
              }

             />
             <FormValidationMessage>{this.state.errorMsg2}</FormValidationMessage>

            <View style={styles.loginBtnContainer}>
              <Button
                title="Login"
                onPress = {this.onLoginPress}
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

/*

		      /*
                    new LecturerAPI().login(
			this.state.email,
			this.state.password,
			(r) => {

			    if(r.result==true){
				this.props.login();
				this.props.dispatchLogin(this.state.email, r.id);
			    }else{
				if(this.state.email ==""){
				    this.wrongInputValidate();
				    this.setState({
					errorMsg: r.msg,
					error: true
				    })
				}
				else if(this.state.password ==""){
				    this.correctInputValidate();
				    this.wrongInputValidate2();
				    this.setState({
					errorMsg:"",
					errorMsg2: r.msg,
					error2: true
				    })
				}
				else{
				    errorMsg2: r.msg;
				}
			    }
                        //this.setState({redirect:true})
			}
                    )
                  }*/



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
     elevation: 24

  },
  formInputStyle: {
    'borderWidth': 0.5,
    'borderColor': 'white'
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
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  }
});

const mapStateToProps = (state) => ({
  loginStateReducer: state.loginStateReducer,
  studentStateReducer: state.studentStateReducer
});
const mapDispatchToProps = (dispatch) => {
  return {
      dispatchLogin: (c) => dispatch({type: "LOGIN", credentials: c}),
      setPeriod: data => dispatch({type: "SET_PERIOD", period: data})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
