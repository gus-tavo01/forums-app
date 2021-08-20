import ForumsApi from '../api/ForumsApi';

export default class UsersService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  getByLoginName = async (loginName, token) => this.forumsApi.usersGetByLoginName(loginName, token);

  getById = async (id, token) => this.forumsApi.usersGetById(id, token);

  getByFilters = async (filters) => this.forumsApi.usersGet(filters);
}
