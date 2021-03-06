import {combineReducers} from 'redux';

//import createHistory from "history/createMemoryHistory";
//const history = createHistory();

//import subjectListReducer from './subjectListReducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import loginStateReducer from './loginStateReducer';
import subjectListReducer from './subjectListReducer';
import studentStateReducer from './studentStateReducer';
import lecturerStateReducer from './lecturerStateReducer';


const reducers = combineReducers({

    loginStateReducer,
    subjectListReducer,
    studentStateReducer,
    lecturerStateReducer,
    routing: routerReducer
});

export default reducers;
