import axios from 'axios';
import { ForumsApiUrl, Timeout } from '../constants/Api';

function successCallback(response) {
  return response.data;
}

function errorCallback(error) {
  let payload = {
    errorMessage: error.request.statusText,
    statusCode: error.request.status,
  };

  if (error.response) {
    payload = error.response.data;
  }

  return payload;
}

export default class ForumsApi {
  constructor(timeout = Timeout) {
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

  // #region Auth endpoint
  authLogin = async (authData) => this.instance.post('/auth/login', authData);

  authRegister = async (userData) => this.instance.post('auth/register', userData);

  // authPwdReset
  // authForgotPwd
  // #endregion Auth endpoint

  // #region Users endpoint
  usersGet = async (params) => this.instance.get('/users', { params });

  usersGetById = async (id) => this.instance.get(`/users/${id}`);

  usersPost = async (userData) => this.instance.post('/users', userData);

  userPatch = async (id, patch) => this.instance.patch(`/users/${id}`, patch);

  usersDelete = async (id) => this.instance.delete(`/users/${id}`);
  // #endregion Users endpoint

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
}
