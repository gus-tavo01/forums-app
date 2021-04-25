import { SET_FORUMS_IS_LOADING, SET_FORUM_IS_LOADING } from '../action-types/loaders-action-types';

const initialState = {
  forums: { list: false, page: false },
  forum: { topics: false, page: false },
  topic: { comments: false, page: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FORUMS_IS_LOADING:
      return { ...state, forums: { ...state.forums, ...action.payload } };
    case SET_FORUM_IS_LOADING:
      return { ...state, forum: { ...state.forum, ...action.payload } };
    // SET_TOPIC_IS_LOADING
    // SET_PARTICIPANTS_IS_LOADING
    // SET_LOGIN_IS_LOADING
    default:
      return state;
  }
};
