const INITIAL_STATE = {
  weeklySchedule: [],
  subjectListChecked: false,
  cancelList: []
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case "SET_SCHEDULE":
        return {...state, weeklySchedule: action.weeklySchedule};
      case "CHECK_SUBJECT":
        return {...state, subjectListChecked: true};
      case "ADD_SUBJECT_SCHEDULE":
       var newEntry = {};
       newEntry[action.day] = action.obj;
       let newWeeklySchedule= {...state.weeklySchedule, ...newEntry};

      return {...state, weeklySchedule: newWeeklySchedule};
      case "ADD_CANCEL_SUBJECT":
        return {...state, cancelList: [...cancelList, action.subject]};
      case "REMOVE_CANCEL_SUBJECT":
        let newList = INITIAL_STATE.cancelList.filter( e => e != action.subject );
        return {...state, cancelList: newList};
      default:
        return state;
    }
};
