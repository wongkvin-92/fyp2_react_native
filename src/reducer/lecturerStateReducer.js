const INITIAL_STATE = {
    period: null,
    timetable: null    
};


export default (state=INITIAL_STATE, action) => {
    switch(action.type){
    case "SET_LECTURER_SCHEDULE":
	return {...state, timetable: {"checksum": action.checksum, ...action.schedule}};	
    default:
	return state;
    }
};
