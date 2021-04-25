import { combineReducers } from 'redux';
import loaders from './loaders-reducer';
import forums from './forums-reducer';
import topics from './topics-reducer';
// messages, errors

export default combineReducers({ forums, loaders, topics });
