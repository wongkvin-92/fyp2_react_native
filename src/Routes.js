
import HomeScreen from './containers/HomeScreen';
import LessonScreen from './containers/CancellationScreen';
import CancellationRecordScreen from './containers/CancellationRecordScreen';
import LecturerTabLayout from './containers/HomeScreen/components/TabNavigation';
import LoginScreen from './containers/LoginScreen';
import SplashScreen from './containers/SplashScreen';

import React from 'react';
import {Text} from 'react-native';

export const tabRoutes = [
  {id: "home", label: "Home", component: HomeScreen, logo:"home"},
  {id: "Lesson", label: "Lesson", component: LessonScreen, logo:"description"},
  {id: "Cancellation", label: "Cancellation", component: CancellationRecordScreen, logo:"assignment"}
];


export const commonRoutes = [
  {path: "/", component: SplashScreen},
  {path: "/login", component: LoginScreen},
  {path: "/home", component: LecturerTabLayout}
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
