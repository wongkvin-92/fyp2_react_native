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

      <View style={styles.canceBtnContainer}>
	{props.isPermanant?
	    props.isCancelled=="0"?
             <CheckBox
		   title='Click Here'
		   value={props.checked}
		   checked={props.checked}
		   onPress = {()=> {
		       //
		       props.toggleTick();
		       let temp1  = props.weeklySchedule;
		       let keyList = Object.keys(temp1);
		       let searchMap = keyList.map(e=>temp1[e]);
		       let searchBuffer = [].concat.apply([], searchMap);

		       //let subject = searchBuffer.find(e => e.classID == props.classID);
		       let subject = props.subject;

		       if(subject){
			   if(props.cancelListFromState.hasOwnProperty(hash(subject))){
			       props.removeSubject(subject);
			   }else{
			       props.addSubject(subject);
			   }
			   props.checkSubject();
		       }


		       //else
		       //    console.error("Sorry, error subject not found in the state tree");

                       /*let weekSchedule = Object.keys(props.weeklySchedule).map(e=>props.weeklySchedule[e])；
			 let allClasses = [].concat([], weekSchedule);
			 let subject = allClasses.find(e => e.classID == props.classID);
			 if(subject){
			 props.addSubject(subject);
			 }else
			 console.error("Sorry, error occured");*/
		   }}
		   />

		   :
       <Text>

  		   <Text style={{color: "red", fontWeight:"900"}}>
         Cancelled /
          {props.replacementClass?
         " Replacement class is "+props.replacementClass.newDateTime
        :"No replacement"}
  		   </Text>
        </Text>
		   :<Text style={{color: "blue", fontWeight:"800"}}>Replacement Class</Text>}
      </View>
     </Card>
    </View>
);

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
      toggleTick={()=> this.setState({checked: !this.state.checked}) }
      checked={this.state.checked} {...this.props}
      cancelListFromState={this.state.cancelList}
      subject={this.state.subject}
      />;
  }
};

const mapStateToProps = state => state.subjectListReducer;

const mapDispatchToProps = dispatch => ({
  checkSubject: ()=> dispatch({type: "CHECK_SUBJECT"}),
  addSubject: (subject) => dispatch({type: "ADD_CANCEL_SUBJECT", subject}),
  removeSubject: (subject) => dispatch({type: "REMOVE_CANCEL_SUBJECT", subject})
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyScheduleItem);
