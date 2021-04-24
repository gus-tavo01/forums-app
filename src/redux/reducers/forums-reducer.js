import { ADD_FORUM, LOAD_FORUMS } from '../action-types/forums-action-types';

const initialState = { docs: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORUMS:
      return action.payload;
    case ADD_FORUM:
      return [...state, action.payload];
    // rest of actions...
    default:
      return state;
  }
};
