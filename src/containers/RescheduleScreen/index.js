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

import LessonCard from './components/CardView';

import {Redirect, Link} from 'react-router-native';
import {LecturerAPI} from '../../API';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

/*
const sampleData = [
  {title: "bit200", subName:"IT & Entrepre", type:"lecture1", day:"monday" , duration:"2"},
  {title:"bit306", subName:"Web Tech", type:"lecture1",  day:"tuesday", duration:"2"},
  {title:"bit208", subName:"Data Struct", type:"lecture1", day:"wednesday", duration:"2"},
  {title:"bit301", subName:"IT Proj Mgmt", type:"lecture1",  day:"thursday",duration:"2"},
  {title:"bit103", subName:"Intro DB", type:"lecture1", day:"friday", duration:"2"}
];*/

class HomeView extends React.Component{

  state={redirect:false, data: []};


  componentDidMount(){
    new LecturerAPI().displayLessonList(
          (d) => this.setState({data: d})
    );
  }

  render () {

    return  (

        <View style={styles.containers}>
             {this.state.redirect?<Redirect to="/login" />:<View/>}

             <ScrollView >
             <View style={styles.titleStlye}>
               <Link
                     to="/home"
                     component={Button}
                     rounded
                     icon={{name: 'arrow-left', type: 'font-awesome'}}
                     buttonStyle= {styles.backBtnStyle}
                 />
                 <View style={styles.titleCenterStyle}>
                <Text style={styles.titleTextStyle}>Class Lesson</Text>
                </View>
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
                this.state.data.map( (e,key) =>
                  <LessonCard
                    key={key}
                    {...e}
                  />
                )
              }

             </ScrollView>



        </View>

  );

  }
}

export default HomeView;

/*
<Button
  rounded
  title="Back"
  icon={{name: 'visibility'}}
  buttonStyle= {styles.cancelBtnStyle}
  textStyle = {styles.cancelBtnTextStyle}
  />*/

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
    paddingTop: 16,
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
  titleCenterStyle: {

    alignSelf: 'center'
  },
  backBtnStyle : {
      position:'absolute',
      padding:5,
      paddingLeft:10,
      paddingRight:0,

  }

})
