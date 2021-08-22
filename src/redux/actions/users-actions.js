import UsersService from '../../services/users-service';
import usersConstants from '../action-types/users-action-types';

const usersService = new UsersService();

export const fetchUser = (userId) => async (dispatch) => {
  // Step set loading state
  dispatch({ type: usersConstants.GETBYID_REQUEST });

  // Step get user from BE
  const response = usersService.getById(userId);

  // Step handle response
  if (response.errorMessage) {
    // Step set error state fetch user
    dispatch({ type: usersConstants.GETBYID_FAILURE, payload: response.errorMessage });
    // dispatch alert error
    return false;
  }

  // Step set successful fetch request
  dispatch({ type: usersConstants.GETBYID_SUCCESS, payload: response.payload });
  return true;
};

export const fecthUsers = (filters) => async (dispatch) => {
  // Step set loading state
  dispatch({ type: usersConstants.GET_REQUEST });

  // Step fetch users from BE
  const response = await usersService.getByFilters(filters);

  // Step handle response
  if (response.errorMessage) {
    // Step set fetch error status
    dispatch({ type: usersConstants.GET_FAILURE });
    // dispatch alert error
    return false;
  }

  // Step set fetch success
  dispatch({ type: usersConstants.GET_REQUEST, payload: response.payload });
  return true;
};
