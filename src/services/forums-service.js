import ForumsApi from '../api/ForumsApi';

export default class ForumsService {
  constructor() {
    this.forumsApi = new ForumsApi();
  }

  getForums = async (filters) => {
    const params = { ...filters };
    // TODO
    // handle errors
    const response = await this.forumsApi.getByFilters(params);
    return response;
  };
}
