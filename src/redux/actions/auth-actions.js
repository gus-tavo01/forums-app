import AuthService from '../../services/auth-service';
import authConstants from '../action-types/auth-action-types';

const authService = new AuthService();

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

// register
