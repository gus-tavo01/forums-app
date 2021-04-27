import ForumsService from '../../services/forums-service';
import { LOAD_FORUMS } from '../action-types/forums-action-types';
import { SET_FORUMS_IS_LOADING } from '../action-types/loaders-action-types';

export const loadForums = (payload) => async (dispatch) => {
  // Step display loading spinner on forums list section
  dispatch({ type: SET_FORUMS_IS_LOADING, payload: { list: true } });

  // Step fetch forums from service
  const forumsService = new ForumsService();
  const response = await forumsService.get(payload);

  // Step if errors dispatch error action
  // if (!response.fields)
  // dispatch({error action});

  // Step load forums on UI
  dispatch({ type: LOAD_FORUMS, payload: response.payload });

  // Step hide loading spinner
  dispatch({ type: SET_FORUMS_IS_LOADING, payload: { list: false } });
};

export const addForum = (payload) => async (dispatch) => {
  // TODO
  dispatch({ type: 'ADD_FORUM', payload });
};

// removeForum(payload)
// modifyForum
