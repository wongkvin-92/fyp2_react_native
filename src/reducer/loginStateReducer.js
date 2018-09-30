//import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
  showSplashScreen: false,
  email: "",
  lecturerID: null,
  loading: false,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    //AsyncStorage.setItem('test', '1234');
    //AsyncStorage.getItem('test').then(e=>console.log(e));
    switch(action.type){
      case "LOGIN":
        return {...state, isLoggedIn: true, email: action.email, lecturerID: action.lecturerID};
      case "LOGOUT":
        return {...state, isLoggedIn: false, email: "", lecturerID: null};
      default:
        return state;
    }
};
