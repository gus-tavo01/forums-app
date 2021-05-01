import { LOAD_COMMENTS, CLEAN_COMMENTS, ADD_COMMENT } from '../action-types/comments-action-types';

const initialState = {
  docs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return action.payload;
    case CLEAN_COMMENTS:
      return initialState;
    case ADD_COMMENT:
      return { ...state, docs: [...state.docs, ...action.payload] };
    // TODO
    // rest of actions
    default:
      return state;
  }
};
