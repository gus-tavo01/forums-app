import authConstants from '../action-types/auth-action-types';

const { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } = authConstants;

const token = sessionStorage.getItem('user');
const clearedState = {};
const initialState = token ? { isLoggedIn: true, token } : clearedState;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { logginIn: true };

    case LOGIN_SUCCESS:
      return { isLoggedIn: true, token: action.payload.token };

    case LOGOUT:
      return clearedState;

    case LOGIN_FAILURE:
      return clearedState;

    default:
      return state;
  }
};
