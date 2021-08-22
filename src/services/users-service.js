import ForumsApi from '../api/ForumsApi';

export default class UsersService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  getByLoginName = async (loginName, token) => {
    const response = await this.forumsApi.usersGetByLoginName(loginName, token);
    const user = response.payload.docs.find((u) => u.username === loginName);
    return { ...response, payload: user };
  };

  getById = async (id, token) => this.forumsApi.usersGetById(id, token);

  getByFilters = async (filters) => this.forumsApi.usersGet(filters);
}
