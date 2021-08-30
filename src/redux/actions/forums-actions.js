import ForumsService from '../../services/forums-service';
import forumsConstants from '../action-types/forums-action-types';

const forumsService = new ForumsService();

export const getForums = (filters) => async (dispatch) => {
  // Step display loading spinner on forums page
  dispatch({ type: forumsConstants.GET_REQUEST });

  // Step verify private or public forums
  let getForumsResponse = {};

  // Step fetch forums
  if (filters.public === 'false') {
    // TODO
    // getForumsResponse = await usersService.getForums(filters);
    getForumsResponse = await forumsService.get(filters);
  } else {
    getForumsResponse = await forumsService.get(filters);
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
  dispatch({ type: forumsConstants.ADD_REQUEST });

  // Step invoke service.add
  const response = await forumsService.create(payload.forum, payload.token);

  if (response.errorMessage) {
    // Step clear loading state and display errors
    dispatch({ type: forumsConstants.ADD_FAILURE });
    // Step alert error message
    // dispatch({});
    return false;
  }

  // Step display successful response
  dispatch({ type: forumsConstants.ADD_SUCCESS });
  return true;
};

// removeForum(payload)
// modifyForum
