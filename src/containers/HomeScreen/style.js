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
  backBtnStyle : {

      elevation: 2,
      padding: 5,
      paddingLeft:10,
      paddingRight:0,
  },
  cardBtn1Style:{
    display: 'none'
  },

  cardStyle:{
    elevation: 8,
    marginTop: 20,
    marginBottom: 10,
    borderRadius:6

  },

  cardStyle2:{
    elevation: 8,
    marginBottom: 10,
    borderRadius:6
  },

  btnTextStyle:{

    textShadowColor:"red",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
  },
  cardTitleStyle:{
    fontSize:18,
    color: '#4f9deb',
  },
  cardContentContainerStyle:{
      fontSize:16,
      marginBottom:10,

  },
  cardContentTitleStyle:{
    fontWeight:'900',
  },
  cardContentTitle2Style:{
    color:'#4f9deb',
  },
  viewBtnContainer:{
    flexDirection:'row',
    justifyContent:'center'

  },
  viewBtnStyle:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#4f9deb',
    elevation: 4,
        width: '100%',

  },
  viewBtnTextStyle:{

    textShadowColor:"grey",
    letterSpacing: 3,
    textShadowOffset: {width: 2, height: 2},
    fontWeight:"900",
  },

})
