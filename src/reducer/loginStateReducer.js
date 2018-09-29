const INITIAL_STATE = {
  showSplashScreen: false,
  loginState: true,
  email: "",
  lecturerID: null,
  loading: false,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case "LOGIN":
        return {isLoggedIn: true, email: action.email, lecturerID: action.lecturerID};
      case "LOGOUT":
        return {...INITIAL_STATE};
      default:
        return state;
    }
};
