import hash from 'object-hash';
const INITIAL_STATE = {
  weeklySchedule: {},
  weekStart: null,
  subjectListChecked: false,
  downloadingSchedule: false,
  itemsPending: 0,
  cancelList: {},
  forceReload: false
};

/*
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}*/


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
      case "SET_WEEK_START":
        return {...state, weekStart: action.weekStart};
      case "SET_SCHEDULE":
        return {...state, weeklySchedule: action.weeklySchedule};
      case "CHECK_SUBJECT":
        return {...state, subjectListChecked: Object.keys(state.cancelList).length !=0 };
      case "UNCHECK_SUBJECT":
        return {...state, subjectListChecked: false};
      case "ADD_SUBJECT_SCHEDULE":
       var newEntry = {};
       newEntry[action.day] = action.obj;
       let newWeeklySchedule= {...state.weeklySchedule, ...newEntry};
       return {...state, weeklySchedule: newWeeklySchedule, itemsPending: state.itemsPending-1};
      case "START_DOWNLOAD":
        return {...state,
                  weeklySchedule: {},
                  downloadingSchedule: true,
                  itemsPending: action.itemsPending};
      case "STOP_DOWNLOAD":
        return {...state, downloadingSchedule: false};
      case "ADD_CANCEL_SUBJECT":
       let newItem={};
       newItem[hash(action.subject)] = action.subject;
      return {...state, cancelList: {...state.cancelList, ...newItem}};
      case "REMOVE_CANCEL_SUBJECT":
        //let newList = state.cancelList.filter( e => e != action.subject );
        var temp = {};
          Object.keys(state.cancelList)
                .filter(e => e != hash(action.subject))
                .forEach(key => temp[key] = state.cancelList[key]);
        //Object.keys(temp).map(e => temp[e].classID!=action.subject? temp[e]:null)
        //                .filter(e=>e!=null)
        return {...state, cancelList: temp};
      case "REMOVE_ALL_LIST":
        var temp = {};
        //Object.keys(state.cancelList)
        //      .filter(e => e != hash(action.subject))
        //      .forEach(key => temp[key] = state.cancelList[key]);
        Object.keys(state.weeklySchedule).forEach(d => {
          temp[d] = state.weeklySchedule[d];
           let dailySchedule = state.weeklySchedule[d];
           let dailyIndices = Object.keys(dailySchedule)

           dailyIndices.forEach(i=> {
             let subjHash = hash(dailySchedule[i])
             if(state.cancelList.hasOwnProperty(subjHash)){
               temp[d][i].isCancelled = "1";
             }
           });

           //dailyIndices.forEach(i=> temp[d][i].isCancelled="1");
        });
        console.log(state.cancelList);
        return {...state, weeklySchedule: temp, cancelList:{}, subjectListChecked: false};
      case "FORCE_RELOAD":
        return {...state, forceReload: true};
      case "AFTER_RELOAD":
        return {...state, forceReload: false};
//      case "SET_PERIOD":
//          return {...state, period: action.period};
      default:
        return state;
    }
};
