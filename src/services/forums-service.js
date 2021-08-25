import ForumsApi from '../api/ForumsApi';

export default class ForumsService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  get = async (filters) => {
    const params = {};

    if (filters.page) params.page = filters.page;
    if (filters.pageSize) params.pageSize = filters.pageSize;
    if (filters.topic) params.topic = filters.topic;
    if (filters.author) params.author = filters.author;
    if (filters.public) params.public = filters.public;
    if (filters.isActive) params.isActive = filters.isActive;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    return this.forumsApi.forumsGet(params);
  };
}
