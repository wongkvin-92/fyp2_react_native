import React from 'react';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containers: {
    height: "100%",

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
    paddingLeft:5,
    backgroundColor: 'white',
    elevation:4,
    flexDirection:'row',

  },
  titleTextStyle:{
    fontSize:19,
    fontWeight:"bold",
    color:"black",
    letterSpacing: 2,

  },
  titleCenterStyle: {
      flex:1,
      paddingLeft: 30
  },

  btnTextStyle:{
    textShadowColor:"red",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 6,
    padding: 20,
    marginRight: 10,
    marginTop: 70,
    justifyContent: 'center',
    elevation: 10,
    marginBottom:20
  },
  scheduleContentStyle:{
    marginBottom:10,
    fontSize:15,
  },
  emptyDate: {
    flex:1,
    paddingTop: 50,
    marginRight: 10,
    marginTop: 150,
    marginBottom: 160,
    alignItems: 'center',

  },
  emptyTextStyle:{
    color:'red',
    fontWeight:'900',
    fontSize: 30,
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  backBtnStyle : {
      position:'absolute',
      padding:5,
      paddingLeft:10,
      paddingRight:0,
      marginLeft:0
  },
  canceBtnContainer:{
    alignItems: "flex-end",
  },
  cancelBtnStyle:{
    padding: 5,
    backgroundColor: '#4f9deb',
    elevation: 4,
  },
  cancelBtnTextStyle:{
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  },
  cardTitleStyle:{
    fontSize:18,
    color: '#4f9deb',
  },

});
