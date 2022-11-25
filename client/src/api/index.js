import realListApi from './listApi';
import realItemApi from './itemApi';
import statsApi from './statsApi';
import mockListApi from './mock/mockListApi';
import mockItemApi from './mock/mockItemApi';

// TODO swap based on config

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const listApi = { ...realListApi, ...mockListApi };
const itemApi = { ...realItemApi, ...mockItemApi };

export { listApi, itemApi, statsApi, ApiError };
