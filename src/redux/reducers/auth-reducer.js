import authConstants from '../action-types/auth-action-types';

const {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  GETPROFILE_REQUEST,
  GETPROFILE_SUCCESS,
  GETPROFILE_FAILURE,
} = authConstants;

const token = sessionStorage.getItem('userToken');
const user = sessionStorage.getItem('user');

const clearedState = {};
const initialState =
  token && user ? { isLoggedIn: true, token, user: JSON.parse(user) } : clearedState;

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

    case GETPROFILE_SUCCESS:
      return { ...state, user: action.payload };

    case GETPROFILE_FAILURE:
      return clearedState;

    default:
      return state;
  }
};
