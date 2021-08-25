import forumsConstants from '../action-types/forums-action-types';

const { GET_SUCCESS, GET_FAILURE, GET_REQUEST } = forumsConstants;
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case GET_FAILURE:
      return initialState;
    case GET_REQUEST:
      return { ...state, fetching: true };
    default:
      return state;
  }
};
