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
import {LecturerAPI} from '../../API';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import styles from './style';

class HomeScreen extends React.Component{

  state={
    redirect:false,
    data: [],
    filter: "all",
    fadeAnim: new Animated.Value(0)
  };


  downloadList = (filter)=>{
    new LecturerAPI().displayCancelledList(
        filter,
          (d) => {
            console.log(d); //sort the datta Here
            this.setState({data: d});
          }

    );
  }

  componentDidMount(){

    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000              // Make it take a while
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
                 <Picker.Item label="Pending Reschedule Approval" value="pending" />
                 <Picker.Item label="Approved Rescheduling Request" value="approved" />
                 <Picker.Item label="Unscheduled Cancellation" value="unscheduled" />

                </Picker>
               </Card>
	       {this.state.data.length==0?
		   <View>
          <Card
            containerStyle={styles.cardPickerStlye}
          >
            <Text style={{color: "red", fontWeight:"900"}}>No Cancellation or Rescheduling been made!</Text>
         </Card>
       </View>
		       :
		       <View style={{marginBottom: 30}}>
			     {
				 this.state.data.reverse().map( (e,i) =>
				       <LessonCard
						      key={i}
						      {...e}
						      />
						    )
			     }

		</View>
	       }
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
