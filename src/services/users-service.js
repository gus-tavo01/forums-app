import ForumsApi from '../api/ForumsApi';

export default class UsersService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  getByLoginName = async (loginName, token) => {
    const response = await this.forumsApi.usersGetByLoginName(loginName, token);
    const user = response.payload?.docs.find((u) => u.username === loginName);
    return { ...response, payload: user };
  };

  getById = async (id, token) => this.forumsApi.usersGetById(id, token);

  getByFilters = async (filters) => this.forumsApi.usersGet(filters);

  getForums = async (userId, filters, token) => {
    const params = {};

    if (filters.page) params.page = filters.page;
    if (filters.pageSize) params.pageSize = filters.pageSize;
    if (filters.topic) params.topic = filters.topic;
    if (filters.author) params.author = filters.author;
    if (filters.public) params.public = filters.public;
    if (filters.isActive) params.isActive = filters.isActive;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    return this.forumsApi.userForumsGet(userId, params, token);
  };
}
