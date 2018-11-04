//import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
  showSplashScreen: false,
    credentials: {
	result: false,
	type: "student"
    },
    loading: false,
    isLoggedIn: false
};

//lecturerID: null,


export default (state = INITIAL_STATE, action) => {
    //AsyncStorage.setItem('test', '1234');
    //AsyncStorage.getItem('test').then(e=>console.log(e));
    switch(action.type){
      case "LOGIN":
        return {...state, isLoggedIn: true, credentials: action.credentials};
      case "LOGOUT":
        return {...state, isLoggedIn: false, credentials: null};
      default:
        return state;
    }
};
