import forumsConstants from '../action-types/forums-action-types';

const {
  GET_SUCCESS,
  GET_FAILURE,
  GET_REQUEST,
  ADD_REQUEST,
  ADD_FAILURE,
  ADD_SUCCESS,
} = forumsConstants;
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case GET_FAILURE:
      return initialState;
    case GET_REQUEST:
      return { fetching: true };

    case ADD_REQUEST:
      return { fetching: true };
    case ADD_FAILURE:
      return { ...state, fetching: false };
    case ADD_SUCCESS:
      return state;
    default:
      return state;
  }
};
