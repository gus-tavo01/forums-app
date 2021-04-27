import axios from 'axios';
import { ForumsApiUrl } from '../constants/Api';

function successCallback(response) {
  return response.data;
}

function errorCallback(error) {
  // TODO:
  // define flow on error
  const payload = {
    isSuccess: false,
    errorMessage: error.message,
    statusCode: 500,
  };

  if (error.response) {
    payload.errorMessage = error.response.data.status_message;
    payload.statusCode = error.response.status;
  } else if (error.request) {
    payload.errorMessage = error.request.data.status_message;
    payload.statusCode = error.request.status;
  }

  throw payload;
}

export default class ForumsApi {
  constructor(timeout = 5000) {
    this.timeout = timeout;
    const instance = axios.create({
      baseURL: `${ForumsApiUrl}/api/v0`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    instance.interceptors.response.use(successCallback, errorCallback);
    this.instance = instance;
  }

  setToken = (token) => {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  // #region Forums endpoint
  forumsGet = async (params) => this.instance.get('/forums', { params });

  // forumsPost
  // forumsPatch
  // forumsDelete
  // forumsGetById
  // #endregion Forums endpoint

  // #region Topics endpoints
  topicsGet = async (forumId, params) => this.instance.get(`/forums/${forumId}/topics`, { params });
  // topicsPost
  // topicsGetById
  // topicsPatch
  // topicsDelete
  // #endregion Topics endpoints

  // TODO
  // Comments endpoint
  // Users endpoint

  // #region Auth endpoint
  // authLogin
  // authRegister
  // authPwdReset
  // #endregion Auth endpoint
}
