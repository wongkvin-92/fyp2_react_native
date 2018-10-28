import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';


import {
Icon
} from 'react-native-elements';

import TabNavigator from 'react-native-tab-navigator';
//import TabBar from './TabBar';

import {lecturerTabRoutes, studentTabRoutes} from "../../../Routes";
import {connect} from 'react-redux';

export class TabbedLayout extends React.Component {
    
    constructor(p){
	super(p);
	const tabRoutes = p.credentials.type == "lecturer"?lecturerTabRoutes: studentTabRoutes;
	this.state = {type: p.credentials.type, selectedTab:"home", redirect: false, tabRoutes: tabRoutes};	
    }
  clickHandler = (viewId)=>{
    this.setState({selectedTab: viewId});
  }

/*    logout(){
        this.props.logout ();
        this.setState({redirect: true});
	}*/
    componentWillMount(){
	if(this.props.credentials != null){
	    //alert("Logged in as "+this.state.type);	    
	}else{
	    //todo: redirect back to login screen if we reach here
	}	
    }


   render(){
     return(
       <View style={{height: "100%"}}>
       <TabNavigator
        tabBarStyle={styles.tabBarStyle}
       >
         {this.state.tabRoutes.map( (el, i) => (
	     
          <TabNavigator.Item
           key={i}
           titleStyle={{fontWeight: 'bold', fontSize: 12}}
           title={el.id}
           renderIcon={() => <Icon containerStyle={{paddingTop:40}} color={'#5e6977'} name={el.logo} size={30} />}
           renderSelectedIcon={() => <Icon containerStyle={{paddingTop:30}} color={'#6296f9'} name={el.logo} size={26} />}
           selected={this.state.selectedTab === el.id}
           onPress={()=>{ this.clickHandler(el.id); }}
           {...el.props}
          >
          <el.component {...this.props}/>
         </TabNavigator.Item>

        ))}
       </TabNavigator>
       </View>
     );
   }
}


const mapStateToProps = state => state.loginStateReducer;
export default connect(mapStateToProps, null)(TabbedLayout);

/**
 *
 Our own tab
<TabBar
 onClick = {this.clickHandler}
 tabData = {tabRoutes}
/>
 **/

//export default TabbedHome;

const styles = StyleSheet.create({
  tabBarStyle:{
  overflow: 'hidden' ,
  height: '8%',
  backgroundColor: 'white',
  elevation:4,
},
})
