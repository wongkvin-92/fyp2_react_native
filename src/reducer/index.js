import {combineReducers} from 'redux';

//import createHistory from "history/createMemoryHistory";
//const history = createHistory();


//import subjectListReducer from './subjectListReducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import loginStateReducer from './loginStateReducer';

const reducers = combineReducers({
    loginStateReducer,
    routing: routerReducer
});



export default reducers;
