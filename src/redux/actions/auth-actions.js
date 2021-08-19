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
  }

  // response.payload.token;
  const payload = { token: 'my-fake-token' };

  // store token and create user session
  dispatch({ type: authConstants.LOGIN_SUCCESS, payload });
};

export const logout = () => {
  localStorage.removeItem('user');
  return { type: authConstants.LOGOUT };
};

// register
