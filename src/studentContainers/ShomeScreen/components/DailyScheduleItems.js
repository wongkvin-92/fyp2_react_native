import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {CheckBox, Card} from 'react-native-elements';
import {styles} from '../style';
import {connect} from 'react-redux';
import hash from 'object-hash';
/*
const checkBoxTest = ({checkSubj}) =>{
  //alert("hey");
  checkSubj();
}*/

const DailyScheduleItemFunc = (props) => (

    <View>
    <Card
      title={props.subjectID}
      titleStyle={styles.cardTitleStyle}
      containerStyle={[styles.item, {height: props.height}]}
    >

      <Text style={styles.scheduleContentStyle}>{props.subjectName}</Text>
      <Text style={styles.scheduleContentStyle}>{props.type}</Text>

      <Text style={styles.scheduleContentStyle}>From {props.startTime} to {props.endTime}</Text>
      <Text> {props.newVenue}</Text>
      <View style={styles.canceBtnContainer}>
	{props.isPermanant != false?<Text>Weekly</Text>:<Text>Replacement</Text>}
      {props.isCancelled==false?
      <Text style={{color: "blue", fontWeight:"900"}}>
            Normal

      </Text>
        :
        <Text style={{color: "red", fontWeight:"900"}}>
          Cancelled
        </Text>
      }
      </View>
     </Card>
    </View>
);

/*

class DailyScheduleItem extends React.PureComponent{
  constructor(props){
    super(props);
    let subjKeys = ["classID", "type", "subjectID", "subjectName",
                  "startTime", "endTime", "isCancelled", "curDate"];
    let subj = {};
    subjKeys.forEach(key => subj[key] = props[key]);
    let isChecked  = props.cancelList.hasOwnProperty(hash(subj));
    this.state = {checked: isChecked,
                cancelList: [],
                subject: subj
              };
  }

  componentWillReceiveProps(newProps){
    if(this.props.cancelList != newProps.cancelList){
      this.setState({cancelList: newProps.cancelList});
    }
  }
  render(){
      return  <DailyScheduleItemFunc

      cancelListFromState={this.state.cancelList}
      subject={this.state.subject}
      />;
  }
};

*/

export default DailyScheduleItemFunc;
/*
const mapStateToProps = state => state.subjectListReducer;

const mapDispatchToProps = dispatch => ({
  checkSubject: ()=> dispatch({type: "CHECK_SUBJECT"}),
  addSubject: (subject) => dispatch({type: "ADD_CANCEL_SUBJECT", subject}),
  removeSubject: (subject) => dispatch({type: "REMOVE_CANCEL_SUBJECT", subject})
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyScheduleItem);*/
