import React from 'react';
import {View} from 'react-native';
import {Route} from 'react-router-native';

const GenerateRoutes = ({commonRoutes, loginState, props})=>{
//const targetRoute = (!loginState)? defaultRoutes : normalRoutes;
const targetRoute = commonRoutes;
return (
  <View>
    {targetRoute.map( (el, i) =>
      <Route
       key={i}
       id={"route-"+i}
       exact
       path={el.path}
       render={()=><el.component {...props}/>}
       />
    )}

  </View>)
  ;
};

export default GenerateRoutes;
