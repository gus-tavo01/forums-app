import { combineReducers } from 'redux';
import forumsReducer from './forums';
// posts, messages, errors, loadingStatus

export default combineReducers({ forums: forumsReducer });
