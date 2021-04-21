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
  constructor(timeout = 35000) {
    this.timeout = timeout;
    const instance = axios.create({
      baseURL: `${ForumsApiUrl}/api/v0/forums`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // TBD:
        // Authorization: `Bearer ${token}`,
      },
    });
    instance.interceptors.response.use(successCallback, errorCallback);
    this.instance = instance;
  }

  // setToken = (token) => {
  // this.instance.
  // }

  getByFilters = async (params) => this.instance.get('/', params);

  // post
  // put
  // delete
  // getById?
}
