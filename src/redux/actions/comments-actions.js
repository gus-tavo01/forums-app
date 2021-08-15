// import CommentsService from '../../services/comments-service';
import { LOAD_COMMENTS, CLEAN_COMMENTS, ADD_COMMENT } from '../action-types/comments-action-types';
import { SET_TOPIC_IS_LOADING } from '../action-types/loaders-action-types';

export const loadComments = (payload) => async (dispatch) => {
  // Step display loading spinner on comments list section
  dispatch({ type: SET_TOPIC_IS_LOADING, payload: { comments: true } });

  console.log('-- payload');
  console.log(payload);

  // Step fetch comments from service
  // const commentsService = new CommentsService();
  // const response = await commentsService.get(payload);
  const response = {
    payload: {
      docs: [
        {
          id: 'asasd123',
          from: 'ticky',
          to: null,
          message: 'Hello peeps',
          createDate: new Date().toDateString(),
          likes: 1,
          dislikes: 0,
          liked: false,
        },
        {
          id: 'asam123',
          from: 'yayis',
          to: 'ticky',
          message: 'Dejame comida please',
          createDate: new Date().toDateString(),
          likes: 3,
          dislikes: 1,
        },
      ],
    },
  };

  // Step if errors dispatch error action
  // if (!response.fields)
  // dispatch({error action});

  setTimeout(() => {
    // Step load comments on UI
    dispatch({ type: LOAD_COMMENTS, payload: response.payload });

    // Step hide loading spinner
    dispatch({ type: SET_TOPIC_IS_LOADING, payload: { comments: false } });
  }, 3000);

  // Step load comments on UI
  // dispatch({ type: LOAD_COMMENTS, payload: response.payload });

  // Step hide loading spinner
  // dispatch({ type: SET_TOPIC_IS_LOADING, payload: { comments: false } });
};

export const cleanComments = () => ({ type: CLEAN_COMMENTS });

export const addComment = (payload) => async (dispatch) => {
  // TODO
  dispatch({ type: ADD_COMMENT, payload });
};

// removeForum(payload)
// modifyForum
