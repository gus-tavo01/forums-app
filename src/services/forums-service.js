import ForumsApi from '../api/ForumsApi';

export default class ForumsService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  get = async (filters) => {
    const params = {};
    if (filters.page) {
      params.page = filters.page;
    }
    if (filters.name) {
      params.name = filters.name;
    }
    if (filters.author) {
      params.author = filters.author;
    }
    if (filters.size && filters.size !== 'open') {
      params.size = filters.size;
    }

    // TODO
    // handle errors
    const response = await this.forumsApi.forumsGet(params);
    return response;
  };
}
