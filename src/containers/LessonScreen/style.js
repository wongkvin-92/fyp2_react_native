import React from 'react';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
    paddingLeft:20,
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
  },

  btnTextStyle:{
    fontFamily: "Roboto",
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
    marginTop: 150,
    justifyContent: 'center',
    elevation: 10,
    marginBottom:120
  },
  emptyDate: {
    height: 100,
    flex:1,
    paddingTop: 50,
    marginRight: 10,
    marginTop: 150,
    marginBottom: 120
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
    fontFamily: "Roboto",
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  }

});
