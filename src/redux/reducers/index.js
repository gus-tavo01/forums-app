import { combineReducers } from 'redux';
import auth from './auth-reducer';
import forums from './forums-reducer';
import toasts from './toasts-reducer';
// messages, errors

export default combineReducers({ auth, forums, toasts });
