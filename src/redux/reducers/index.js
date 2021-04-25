import { combineReducers } from 'redux';
import loaders from './loaders-reducer';
import forums from './forums-reducer';
// posts, messages, errors, loadingStatus

export default combineReducers({ forums, loaders });
