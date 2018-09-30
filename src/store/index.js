import {createStore, applyMiddleware} from 'redux';
import reducers from "../reducer";

import logger from 'redux-logger';
//import { createStore, applyMiddleware } from 'redux'


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginStateReducer'],
  blackList: ['subjectListReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(logger));
//const store = createStore(persistedReducer);

export const persistor =  persistStore(store);
export default store;
