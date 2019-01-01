const INITIAL_STATE = {
  //  period: {start_date: null, end_date:null},
    timetable: null
};


export default (state=INITIAL_STATE, action) => {
    switch(action.type){
    case "SET_LECTURER_SCHEDULE":
  	return {...state, timetable: {"checksum": action.checksum, ...action.schedule}};
    //case "SET_LECTURER_PERIOD":
    //return 	{...state, period: action.period};
    default:
	  return state;
  }
};
