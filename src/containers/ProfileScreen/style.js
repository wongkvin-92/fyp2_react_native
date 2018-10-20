import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containers: {
    height: "100%",
    backgroundColor: 'rgba(243,129,129,0.9)',
    flexDirection: 'column'
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

  cardStyle:{
    elevation: 8,
    marginTop: 20,
    marginBottom: 10,
    borderRadius:6,
    padding: 20
  },

  cardStyle2:{
    elevation: 8,
    marginBottom: 10
  },

  logoutBtnStyle:{
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'red',
    opacity: 0.9,
    elevation: 2,
    width: '100%',
  },

  btnTextStyle:{
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  loginCardStyle: {
    flex:4,
  },
  logoutBtnBackground: {
    marginTop:20,
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
  },
  cardTitleStyle:{
    fontSize:18,
    color: '#4f9deb',
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,
  },
  cardContentTitleStyle: {
      fontWeight: "900",
  },
  viewBtnContainer:{
    flexDirection:'row',
    justifyContent:'center',

  },
  viewBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#4f9deb',
    elevation: 4,
    width: "100%"

  },
  viewBtnTextStyle:{
    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  },

});
