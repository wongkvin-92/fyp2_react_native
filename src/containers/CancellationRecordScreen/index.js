import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';


import {
  Card, Button
} from 'react-native-elements';

import CardView from './components/CardView';

import {Redirect} from 'react-router-native';


const sampleData = [
  {title: "bit200", subName:"IT & Entrepre", type:"lecture1", day:"monday" , duration:"2"},
  {title:"bit306", subName:"Web Tech", type:"lecture1",  day:"tuesday", duration:"2"},
  {title:"bit208", subName:"Data Struct", type:"lecture1", day:"wednesday", duration:"2"},
  {title:"bit301", subName:"IT Proj Mgmt", type:"lecture1",  day:"thursday",duration:"2"},
  {title:"bit103", subName:"Intro DB", type:"lecture1", day:"friday", duration:"2"}
];

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
            <Text style={styles.titleTextStyle}>Cancellation Records</Text>
          </View>
           <Card>
             <Picker
              selectedValue={this.state.language}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
              itemStyle={styles.pickerItemStyle}
              >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Monday" value="monday" />
              <Picker.Item label="Tuesday" value="tuesday" />
              <Picker.Item label="Wednesday" value="wednesday" />
              <Picker.Item label="Thursday" value="thursday" />
              <Picker.Item label="Friday" value="friday" />
            </Picker>
          </Card>

            {
              sampleData.map(e =>
                <CardView
                  {...e}
                />
              )
            }
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


const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',
  },

  bodyStyle: {
    width: "100%",
  },
  pickerStyle:{

  },
  pickerItemStyle:{
    backgroundColor: "red",
    color: "blue",
    fontSize:20,
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
