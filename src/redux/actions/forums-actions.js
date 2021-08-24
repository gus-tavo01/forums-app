import ForumsService from '../../services/forums-service';
import forumsConstants from '../action-types/forums-action-types';

const forumsService = new ForumsService();

export const getForums = (filters) => async (dispatch) => {
  // Step display loading spinner on forums page
  dispatch({ type: forumsConstants.GET_REQUEST });

  // Step verify private or public forums
  let getForumsResponse = {};

  if (filters.public) {
    // Step fetch forums
    getForumsResponse = await forumsService.get(filters);
  } else {
    // TODO
    // getForumsResponse = await usersService.getForums(filters);
  }

  // Step handle response
  if (getForumsResponse.errorMessage) {
    dispatch({ type: forumsConstants.GET_FAILURE });
    // dispatch alert error
    return false;
  }

  // Step render forums on UI
  dispatch({ type: forumsConstants.GET_SUCCESS, payload: getForumsResponse.payload });
  return true;
};

export const addForum = (payload) => async (dispatch) => {
  // Step display loader
  dispatch({ type: forumsConstants.ADD_REQUEST, payload });
  // Step invoke service.add
  // Step handle errors
  // Step add added forum on state
};

// removeForum(payload)
// modifyForum
