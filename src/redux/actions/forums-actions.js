import ForumsService from '../../services/forums-service';
import { LOAD_FORUMS } from '../action-types/forums-action-types';

export const loadForums = (payload) => async (dispatch) => {
  // set forums loading on true
  const forumsService = new ForumsService();
  const response = await forumsService.getForums(payload);
  // if (!response.fields)
  // dispatch error action
  // success flow
  dispatch({ type: LOAD_FORUMS, payload: response.payload });
  // set forums loading on false
};

export const addForum = (payload) => (dispatch) => {
  dispatch({ type: 'ADD_FORUM', payload });
};

// removeForum(payload)
// modifyForum
