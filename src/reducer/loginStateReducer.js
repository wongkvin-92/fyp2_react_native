const INITIAL_STATE = {
  showSplashScreen: false,
  email: "",
  lecturerID: null,
  loading: false,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case "LOGIN":
        return {...INITIAL_STATE, isLoggedIn: true, email: action.email, lecturerID: action.lecturerID};
      case "LOGOUT":
        return {...INITIAL_STATE, isLoggedIn: false, email: "", lecturerID: null};
      default:
        return state;
    }
};
