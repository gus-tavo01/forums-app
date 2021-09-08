import axios from 'axios';
import { ForumsApiUrl, Timeout } from '../constants/Api';

function successCallback(response) {
  return response.data;
}

function errorCallback(error) {
  let payload = {
    errorMessage: error.toJSON().message,
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
  userForumsGet = async (userId, filters, token) => {
    this.setToken(token);
    return this.instance.get(`/users/${userId}/forums`, { params: filters });
  };

  usersGetByLoginName = async (loginName, token) => {
    this.setToken(token);
    return this.instance.get(`/users?userName=${loginName}`);
  };

  usersGet = async (params) => this.instance.get('/users', { params });

  usersGetById = async (id, token) => {
    this.setToken(token);
    return this.instance.get(`/users/${id}`);
  };

  usersPost = async (userData, token) => {
    this.setToken(token);
    return this.instance.post('/users', userData);
  };

  userPatch = async (id, patch, token) => {
    this.setToken(token);
    return this.instance.patch(`/users/${id}`, patch);
  };

  usersDelete = async (id, token) => {
    this.setToken(token);
    this.instance.delete(`/users/${id}`);
  };
  // #endregion Users endpoint

  // #region Forums endpoint
  forumsGet = async (params) => this.instance.get('/forums', { params });

  forumsPost = async (forumData) => this.instance.post('/forums', forumData);

  // forumsPatch
  // forumsDelete
  // forumsGetById
  // #endregion Forums endpoint

  // TODO
  // Comments endpoint
}
