import { combineReducers } from 'redux';
import loaders from './loaders-reducer';
import forums from './forums-reducer';
import topics from './topics-reducer';
import comments from './comments-reducer';
// errors

export default combineReducers({ forums, loaders, topics, comments });
