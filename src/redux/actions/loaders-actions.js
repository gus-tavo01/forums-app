import { SET_FORUMS_IS_LOADING, SET_FORUM_IS_LOADING } from '../action-types/loaders-action-types';

export const setForumsIsLoading = (payload) => ({ payload, action: SET_FORUMS_IS_LOADING });

export const setForumIsLoading = (payload) => ({ payload, action: SET_FORUM_IS_LOADING });
