// redux tree List
const INITIAL_STATE = {
  period: [],
  downloadProgress: 0.0,
  downloadState: "idle",  //idle <--> downloadingWeek/downloadSem
  syncState: "none", //none -> sync <-> unsync
  enrolledSubject: [],
  subjectList: {
  }
};

// i need mapStateToProps and dispatchtoprops will be null

export default (state=INITIAL_STATE, action ) =>{
    switch(action.type){
     case "ENROLL_SUBJECT":
	       return{...state, enrolledSubject: [...state.enrolledSubject, action.subject]};
    case "REMOVE_SUBJECT":
      	let prevlist = state.enrolledSubject;
      	let newlist = prevlist.filter(e=> e != action.subject);
      	return{...state, enrolledSubject: action.subject};
    case "CLEAR_SUBJECT": return{...state, enrolledSubject: []};
    case "SET_SUBJECT": return{...state, enrolledSubject: action.subject};
    case "UPDATE_SCHEDULE": return{...state, subjectList: action.subjectList};
    case "SET_PERIOD":
      return {...state, period: action.period};
    case "SYNC_DONE":
        return {...state, syncState: "sync"};
    case "OUT_OF_SYNC":
        return {...state, syncState: "unsync"};
    default:
	   return state;
    }
};
