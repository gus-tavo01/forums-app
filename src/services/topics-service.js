import ForumsApi from '../api/ForumsApi';

export default class TopicsService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  get = async (filters) => {
    const params = {};
    const { forumId } = filters;

    // validate filters.forumId is present
    // if (!forumId)

    if (filters.name) {
      params.name = filters.name;
    }

    if (filters.page) {
      params.page = filters.page;
    }

    if (filters.pageSize) {
      params.pageSize = filters.pageSize;
    }

    if (filters.sortOrder) {
      params.sortOrder = filters.sortOrder;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    // TODO
    // handle errors
    const response = await this.forumsApi.topicsGet(forumId, params);
    return response;
  };

  // getById = async (id) => {};

  // update = async (id, patch) => {};

  // delete = async (id) => {};
}
