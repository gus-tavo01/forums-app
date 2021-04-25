import { ADD_TOPIC, LOAD_TOPICS } from '../action-types/topics-action-types';

const initialState = { docs: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOPICS:
      return action.payload;
    case ADD_TOPIC:
      return [...state, action.payload];
    // remove
    // modify
    default:
      return state;
  }
};
