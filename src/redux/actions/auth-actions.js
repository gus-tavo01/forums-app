import AuthService from '../../services/auth-service';
import UsersService from '../../services/users-service';
import authConstants from '../action-types/auth-action-types';

const authService = new AuthService();
const usersService = new UsersService();

export const login = (authData) => async (dispatch) => {
  // Step set loading	state
  dispatch({ type: authConstants.LOGIN_REQUEST });

  // Step fetch login request
  const response = await authService.login(authData);

  // handle service response
  if (response.errorMessage) {
    dispatch({ type: authConstants.LOGIN_FAILURE });
    // dispatch an error message on UI
    return false;
  }

  const { payload } = response;
  // store token and create user session
  sessionStorage.setItem('user', payload.token);
  dispatch({ type: authConstants.LOGIN_SUCCESS, payload });
  return true;
};

export const logout = () => {
  sessionStorage.removeItem('user');
  return { type: authConstants.LOGOUT };
};

export const getProfile = (username, token) => async (dispatch) => {
  // Step set loading state
  dispatch({ type: authConstants.GETPROFILE_REQUEST });

  // Step get user from BE
  const response = usersService.getByLoginName(username, token);

  // Step handle response
  if (response.errorMessage) {
    // Step set error state fetch user
    dispatch({ type: authConstants.GETPROFILE_FAILURE, payload: response.errorMessage });
    // dispatch alert error
    return false;
  }

  // Step set successful fetch request
  dispatch({ type: authConstants.GETPROFILE_SUCCESS, payload: response.payload });
  return true;
};

// register
