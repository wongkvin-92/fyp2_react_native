
import HomeScreen from './containers/HomeScreen';
import CancellationScreen from './containers/CancellationScreen';
import LessonScreen from './containers/LessonScreen';
import LecturerTabLayout from './containers/HomeScreen/components/TabNavigation';
import LoginScreen from './containers/LoginScreen';
import SplashScreen from './containers/SplashScreen';
import ProfileScreen from './containers/ProfileScreen';
import RescheduleScreen from './containers/RescheduleScreen';
import RequestRescheduleScreen from './containers/RescheduleRequestScreen';

import React from 'react';
import {Text} from 'react-native';

import {withRouter} from 'react-router-native';


export const tabRoutes = [
    {id: "home", label: "Home", component: CancellationScreen, logo:"home"},

    {id: "profile", label: "Profile", component: ProfileScreen, logo:"face"}
];


export const commonRoutes = [
    {path: "/", component: SplashScreen},
    {path: "/login", component: LoginScreen},
    {path: "/home", component: LecturerTabLayout},
    {path: "/lessons", component: LessonScreen},
    {path: "/reschedule", component: RescheduleScreen },
    {path: "/request/:id", component: withRouter((props) => {

	return <RequestRescheduleScreen {...props} />;
    })
    }
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
