// import TopicsService from '../../services/topics-service';
import { LOAD_TOPICS, ADD_TOPIC } from '../action-types/topics-action-types';
import { SET_FORUM_IS_LOADING } from '../action-types/loaders-action-types';

export const loadTopics = () => async (dispatch) => {
  // Step display loading spinner on topics list section
  dispatch({ type: SET_FORUM_IS_LOADING, payload: { topics: true } });

  // Step fetch forum topics from service
  // const topicsService = new TopicsService();
  // const response = await topicsService.getTopics(payload);

  // Step if errors dispatch error action
  // if (!response.fields)
  // dispatch({error action});

  // TODO
  // Step load topics on UI
  const response = {
    payload: {
      docs: [
        {
          id: 'asdasd124',
          name: 'My ticky eats rammen',
          lastActivity: new Date().toString(),
          comments: 2,
        },
        { id: 'asdad', name: 'Sarita eats shit', lastActivity: new Date().toString(), comments: 1 },
        {
          id: 'qwerty1234',
          name: 'My yayis eats sushi',
          lastActivity: new Date().toString(),
          comments: 5,
        },
      ],
    },
  };

  setTimeout(() => {
    dispatch({ type: LOAD_TOPICS, payload: response.payload });

    // Step hide loading spinner
    dispatch({ type: SET_FORUM_IS_LOADING, payload: { topics: false } });
  }, 3000);
};

export const addTopic = (payload) => async (dispatch) => {
  // TODO
  dispatch({ type: ADD_TOPIC, payload });
};

// removeForum(payload)
// modifyForum
