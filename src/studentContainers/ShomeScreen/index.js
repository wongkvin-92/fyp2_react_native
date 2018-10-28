import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Picker,
  Animated
} from 'react-native';

import {
  Card, Button
} from 'react-native-elements';

import LessonCard from './components/lessonCardView';

import {Redirect, Link} from 'react-router-native';
import {StudentAPI} from '../../API';

import styles from './style';
/*
const sampleData = [
  {title: "bit200", subName:"IT & Entrepre", type:"lecture1", day:"monday" , duration:"2"},
  {title:"bit306", subName:"Web Tech", type:"lecture1",  day:"tuesday", duration:"2"},
  {title:"bit208", subName:"Data Struct", type:"lecture1", day:"wednesday", duration:"2"},
  {title:"bit301", subName:"IT Proj Mgmt", type:"lecture1",  day:"thursday",duration:"2"},
  {title:"bit103", subName:"Intro DB", type:"lecture1", day:"friday", duration:"2"}
];*/

class HomeScreen extends React.Component{

  state={
    redirect:false,
    data: [],
    filter: "all",
    fadeAnim: new Animated.Value(0),
  };


  downloadList = (filter)=>{
    new StudentAPI().displayCancelledList(
        filter,
          (d) => this.setState({data: d})
    );
  }

  componentDidMount(){

    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();

    this.downloadList("all");


  }

  render () {

    return  (

        <View style={styles.containers}>

             {this.state.redirect?<Redirect to="/login" />:<View/>}

             <View style={styles.titleStlye}>

                 <View style={styles.titleCenterStyle}>
                <Text style={styles.titleTextStyle}>Home</Text>
                </View>
             </View>
             <View style={{flex: 1}}>
             <Animated.View style={[{opacity: this.state.fadeAnim}]}>
             <ScrollView >

               <Card
                containerStyle={styles.cardPickerStlye}
               >
                 <Picker
                  selectedValue={this.state.filter}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) => {
                      this.downloadList(itemValue);
                      this.setState({filter: itemValue});
                  }}
                  itemStyle={styles.pickerItemStyle}
                 >
                 <Picker.Item label="All Cancel & Rescheduling Record" value="all" />
                 <Picker.Item label="Cancelled Classes" value="cancelled" />
                 <Picker.Item label="Rescheduled Classes" value="rescheduled" />

                </Picker>
               </Card>
               <View style={{marginBottom: 30}}>
                {
                  this.state.data.map( (e,key) =>
                    <LessonCard
                      key={key}
                      {...e}
                    />
                  )
                }
              </View>
             </ScrollView>
            </Animated.View>
          </View>
        </View>


  );

  }
}

export default HomeScreen;

/*
<Button
  rounded
  title="Back"
  icon={{name: 'visibility'}}
  buttonStyle= {styles.cancelBtnStyle}
  textStyle = {styles.cancelBtnTextStyle}
  />*/
