import React from 'react';

//import {loggedIn, notLoggedIn} from "./src/Routes";
import {commonRoutes} from "./src/Routes";
import GenerateRoutes from './src/GenerateRoutes';

import {LecturerAPI} from "./src/API";

import {RedirectTo, NativeRouter, Route, Link} from 'react-router-native';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Platform,
  Button,
  TouchableOpacity,
  StyleSheet} from 'react-native';


import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from "./src/store";

class MainApp extends React.Component {
//  state={loading: false, isLoggedIn: false};


  componentWillMount(){

    //this.setState({loading:false, isLoggedIn: false});

    //Load state from the server

    /*new LecturerAPI().checkLoginState(
      () =>    this.setState({isLoggedIn: true, loading: false}),
      () =>     this.setState({isLoggedIn: false, loading: false})
    );*/

  }

 lecturerLogin = ()=>{
   this.setState({isLoggedIn: true});
  }
  //success() - callback func
  onLogout = ()=> this.setState({isLoggedIn: false});

  render(){
    return (
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <NativeRouter>
            <GenerateRoutes
              commonRoutes={commonRoutes}
              props={
                {
                  changeLogin: ()=>{},
                  login: this.lecturerLogin,
                  logout: ()=> {                   //success() - callback func
                    new LecturerAPI().logout( this.onLogout )
                  },
                  setLogin: this.setLogin,
                            ...this.state
                }
              }
             />
            </NativeRouter>
          </PersistGate>
      </Provider>
    );
  }
}



//const ConnectedMainApp = connect(state => state.loginStateReducer)(MainApp);
export default MainApp;
