import ForumsApi from '../api/ForumsApi';

export default class UsersService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  getById = async (id) => this.forumsApi.usersGetById(id);

  getByFilters = async (filters) => this.forumsApi.usersGet(filters);
}
