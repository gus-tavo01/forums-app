import ForumsService from '../../services/forums-service';
import UsersService from '../../services/users-service';
import forumsConstants from '../action-types/forums-action-types';

const forumsService = new ForumsService();
const usersService = new UsersService();

export const getForums = (filters) => async (dispatch) => {
  // Step display loading spinner on forums page
  dispatch({ type: forumsConstants.GET_REQUEST });

  let getForumsResponse = {};

  // Step fetch forums
  if (filters.public === 'false') {
    const stringUser = sessionStorage.getItem('user');
    const user = stringUser ? JSON.parse(stringUser) : null;
    const token = sessionStorage.getItem('userToken');
    if (!user) {
      // TODO
      // Step dispatch alert error
      return false;
    }
    getForumsResponse = await usersService.getForums(user.id, filters, token);
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
