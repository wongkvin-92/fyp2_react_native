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

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

/*
const sampleData = [
  {title: "bit200", subName:"IT & Entrepre", type:"lecture1", day:"monday" , duration:"2"},
  {title:"bit306", subName:"Web Tech", type:"lecture1",  day:"tuesday", duration:"2"},
  {title:"bit208", subName:"Data Struct", type:"lecture1", day:"wednesday", duration:"2"},
  {title:"bit301", subName:"IT Proj Mgmt", type:"lecture1",  day:"thursday",duration:"2"},
  {title:"bit103", subName:"Intro DB", type:"lecture1", day:"friday", duration:"2"}
];
*/

class HomeView extends React.Component{

  state={redirect:false, items: {}};

  logout(){
      this.props.logout ();
      this.setState({redirect: true});
  }

  loadItems(day) {
    /*
    const time = day.timestamp + 0 * 24 * 60 * 60 * 1000;
    const strTime = this.timeToString(time);

    this.setState({
      items: {
        "2018-07-27": [
          {
          name: "test",
          height: 30
        }
        ]
      }
    });*/
    setTimeout(() => {
      for (let i = -15; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render () {
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};

    return  (

        <View style={styles.containers}>
             {this.state.redirect?<Redirect to="/login" />:<View/>}

             <Agenda
             items={this.state.items}
             loadItemsForMonth={this.loadItems.bind(this)}
             selected={'2018-08-27'}
             // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
             minDate={'2018-08-01'}
             // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
             maxDate={'2018-11-30'}
             renderItem={this.renderItem.bind(this)}
             renderEmptyDate={this.renderEmptyDate.bind(this)}
             rowHasChanged={this.rowHasChanged.bind(this)}
             // markingType={'period'}
             markingType={'multi-dot'}
             markedDates={{
             //    '2017-05-08': {textColor: '#666'},
             //    '2017-05-09': {textColor: '#666'},
             //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},


               '2018-08-28': {
                 dots: [vacation, massage, workout],
               },
               '2018-08-29': {
                 dots: [massage, workout]
               },

             //    '2017-05-22': {endingDay: true, color: 'gray'},
             //    '2017-05-24': {startingDay: true, color: 'gray'},
             //    '2017-05-25': {color: 'gray'},
             //    '2017-05-26': {endingDay: true, color: 'gray'}}}
              // monthFormat={'yyyy'}

            // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          }}
          theme={{
            backgroundColor: 'rgba(243,129,129,0.9)',
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'black',
          }}
         />
        </View>
  );
  }
}

/*
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

*/
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
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }

})
