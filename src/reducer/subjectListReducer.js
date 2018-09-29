const INITIAL_STATE = {
  weeklySchedule: [],
  subjectListChecked: false
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case "SET_SCHEDULE":
        return {...INITIAL_STATE, weeklySchedule: action.weeklySchedule};
      default:
        return state;
    }
};
