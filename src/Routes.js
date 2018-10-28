import React from 'react';
import {Text} from 'react-native';
import {withRouter} from 'react-router-native';

//Both student and lecturer
import LoginScreen from './containers/LoginScreen';
import SplashScreen from './containers/SplashScreen';
import ProfileScreen from './containers/ProfileScreen';
import LecturerTabLayout from './containers/HomeScreen/components/TabNavigation'; //refactor this out of homescreen into an independent component

//Lecturer Routes
import HomeScreen from './containers/HomeScreen';
import LessonScreen from './containers/LessonScreen';
import RescheduleScreen from './containers/RescheduleScreen';
import RequestRescheduleScreen from './containers/RescheduleRequestScreen';


//import CancellationScreen from './containers/CancellationScreen';
//import NotificationScreen from './containers/NotificationScreen';

//student Routes
import EnrollScreen from './studentContainers/SenrollSubjectScreen';
import SHomeScreen from './studentContainers/ShomeScreen';




export const lecturerTabRoutes = [
    {id: "home", label: "Home", component: HomeScreen, logo:"home"},
    {id: "profile", label: "Profile", component: ProfileScreen, logo:"face"}
];

export const studentTabRoutes = [
    {id: "home", label: "Home", component: SHomeScreen, logo:"home"},
    {id: "profile", label: "Profile", component: ProfileScreen, logo:"face"}
];


//Lecturer Routes
export const commonRoutes = [
    
    {path: "/", component: SplashScreen},
    {path: "/login", component: LoginScreen},
    {path: "/home", component: LecturerTabLayout},

    //Lecturer Routes
    {path: "/lecturer/lessons", component: LessonScreen},
    //{path: "/reschedule", component: RescheduleScreen },
    {path: "/lecturer/request/:id", component: withRouter((props) => {
  	     return <RequestRescheduleScreen {...props} />;
      })
    }
    
    //Student Routes
,

];

/*
export const notLoggedIn = [
  {path: "/", component: SplashScreen},
  {path: "/login", component: LoginScreen}
];

export const loggedIn = [
  {path: "/", component: SplashScreen},
  {path: "/home", component: HomeScreen}
]; */
