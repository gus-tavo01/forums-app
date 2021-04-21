import ForumsService from '../../services/forums-service';
import { LOAD_FORUMS } from '../action-types/forums-action-types';

export const loadForums = (payload) => {
  return async (dispatch) => {
    // set forums loading on true
    const forumsService = new ForumsService();
    const response = await forumsService.getForums(payload);
    // if (!response.fields)
    // dispatch error action
    // success flow
    dispatch({ type: LOAD_FORUMS, payload: response.payload });
    // set forums loading on false
  };
};

export const addForum = (payload) => {
  return (dispatch) => {
    console.log(payload);
    dispatch({ type: 'ADD_FORUM', payload });
  };
};

// removeForum(payload)
// modifyForum
