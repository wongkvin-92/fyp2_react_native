import React from 'react';
import {View, Text, Image} from 'react-native';

Icon

import {
Icon
} from 'react-native-elements';

import TabNavigator from 'react-native-tab-navigator';
//import TabBar from './TabBar';

import {tabRoutes} from "../../../Routes";

export class TabbedHome extends React.Component {
  state = {selectedTab:"home", redirect: false};

  clickHandler = (viewId)=>{
    this.setState({selectedTab: viewId});
  }

/*    logout(){
        this.props.logout ();
        this.setState({redirect: true});
    }*/


   render(){
     return(
       <View style={{height: "100%"}}>
       <TabNavigator
        tabBarStyle={{ overflow: 'hidden' }}
       >
        {tabRoutes.map( (el, i) => (

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

/**
 *
 Our own tab
<TabBar
 onClick = {this.clickHandler}
 tabData = {tabRoutes}
/>
 **/

export default TabbedHome;
