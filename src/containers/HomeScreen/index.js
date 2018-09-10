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
  Picker
} from 'react-native';


import {
  Card, Button, PricingCard,
} from 'react-native-elements';


import {Redirect} from 'react-router-native';


class HomeView extends React.Component{

  state={redirect:false};

  logout(){
      this.props.logout ();
      this.setState({redirect: true});
  }

  render () {

    return  (

        <View style={styles.containers}>
             {this.state.redirect?<Redirect to="/login" />:<View/>}

           <ScrollView >
           <View style={styles.titleStlye}>
            <Text style={styles.titleTextStyle}>Home</Text>
          </View>
          <PricingCard
            color='#4f9deb'
            title="Today's Class"
            price='3'
            info={['BIT310 at 2pm', 'BIT200 at 4pm']}
            button={{buttonStyle: styles.cardBtn1Style}}
            containerStyle={styles.pricingCardStyle}
          />
          <PricingCard
            color='#4f9deb'
            title='Cancellation'
            price='10'
            info={['Number of Cancellation', 'Reminder']}
            button={{ title: 'Go', icon: 'flight-takeoff' }}
            containerStyle={styles.pricingCardStyle}
          />
          <PricingCard
            color='#4f9deb'
            title='Reschedule'
            price='10'
            info={['Reschedule Records']}
            button={{ title: 'Go', icon: 'flight-takeoff' }}
            containerStyle={styles.pricingCardStyle}
          />


            <View style={styles.logoutBtnBackground}>
              <Button rounded
                 title="Logout"
                 onPress={this.logout.bind(this)}
                 buttonStyle= {styles.logoutBtnStyle}
                 textStyle = {styles.btnTextStyle}
                 fontWeight="bold"
               />
             </View>

          </ScrollView>


        </View>

  );

  }
}


export default HomeView;
//export default TabNavigator;

const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',
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
  pricingCardStyle:{
    elevation: 8,
  },
  logoutBtnStyle:{
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'rgba(243,129,129,0.9)',
    elevation: 2,
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
  }

})
