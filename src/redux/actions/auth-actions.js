import AuthService from '../../services/auth-service';
import UsersService from '../../services/users-service';
import authConstants from '../action-types/auth-action-types';

const authService = new AuthService();
const usersService = new UsersService();

export const login = (authData) => async (dispatch) => {
  // Step set loading	state
  dispatch({ type: authConstants.LOGIN_REQUEST });

  // Step fetch login request
  const loginResponse = await authService.login(authData);

  // handle service response
  if (loginResponse.errorMessage) {
    dispatch({ type: authConstants.LOGIN_FAILURE });
    // TODO dispatch an error message on UI
    return false;
  }

  // Step store token and create user session
  const { token } = loginResponse.payload;
  sessionStorage.setItem('userToken', token);
  dispatch({ type: authConstants.LOGIN_SUCCESS, payload: loginResponse.payload });

  // Step get user profile
  const getProfileResponse = await usersService.getByLoginName(authData.username, token);

  // Step handle response
  if (getProfileResponse.errorMessage) {
    // Step set error state fetch user
    dispatch({ type: authConstants.GETPROFILE_FAILURE, payload: getProfileResponse.errorMessage });
    // TODO dispatch alert error
    return false;
  }

  // Step store user profile
  sessionStorage.setItem('user', JSON.stringify(getProfileResponse.payload));
  dispatch({ type: authConstants.GETPROFILE_SUCCESS, payload: getProfileResponse.payload });
  return true;
};

export const logout = () => {
  // Step clear session storage
  sessionStorage.removeItem('userToken');
  sessionStorage.removeItem('user');
  return { type: authConstants.LOGOUT };
};

export const register = (userAccount) => async (dispatch) => {
  // Step set registering status
  dispatch({ type: authConstants.REGISTER_REQUEST });

  // Step post to BE
  const response = await authService.register(userAccount);

  // Step handle response errors
  if (response.errorMessage) {
    dispatch({ type: authConstants.REGISTER_FAILURE });
    // dispatch alert type failure
    return false;
  }

  // Set registering success status
  dispatch({ type: authConstants.REGISTER_SUCCESS });

  return true;
};
