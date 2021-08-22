import ForumsApi from '../api/ForumsApi';

export default class AuthService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  login = async (authData) => {
    const response = await this.forumsApi.authLogin(authData);
    return response;
  };
}
