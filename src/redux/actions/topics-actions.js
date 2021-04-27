import TopicsService from '../../services/topics-service';
import { LOAD_TOPICS, ADD_TOPIC } from '../action-types/topics-action-types';
import { SET_FORUM_IS_LOADING } from '../action-types/loaders-action-types';

export const loadTopics = (payload) => async (dispatch) => {
  // Step display loading spinner on topics list section
  dispatch({ type: SET_FORUM_IS_LOADING, payload: { topics: true } });

  // Step fetch forum topics from service
  const topicsService = new TopicsService();
  const response = await topicsService.get(payload);

  // Step if errors dispatch error action
  // if (!response.fields)
  // dispatch({error action});

  // Step load topics on UI
  dispatch({ type: LOAD_TOPICS, payload: response.payload });

  // Step hide loading spinner
  dispatch({ type: SET_FORUM_IS_LOADING, payload: { topics: false } });
};

export const addTopic = (payload) => async (dispatch) => {
  // TODO
  dispatch({ type: ADD_TOPIC, payload });
};

// removeForum(payload)
// modifyForum
