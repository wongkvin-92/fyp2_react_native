import React from 'react';
import {View, Text, Button} from 'react-native';
import {Route, withRouter} from 'react-router-native';

import {connect} from 'react-redux';

import { push } from 'react-router-redux';

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


//export default connect(s=>s.routing, dispatch => {return {cr: e=>dispatch(push(e)), dispatch} })(A);
//const connectedGenerateRoutes = connect(state => state.loginStateReducer)(GenerateRoutes);
export default GenerateRoutes;
