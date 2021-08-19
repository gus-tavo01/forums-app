import { combineReducers } from 'redux';
import auth from './auth-reducer';
import loaders from './loaders-reducer';
import forums from './forums-reducer';
import topics from './topics-reducer';
// messages, errors

export default combineReducers({ auth, forums, loaders, topics });
