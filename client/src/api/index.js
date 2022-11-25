import realListApi from './listApi';
import itemApi from './itemApi';
import statsApi from './statsApi';
import mockApi from './mock';

// TODO swap based on config

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const listApi = { ...realListApi, getLists: mockApi.getLists };

export { listApi, itemApi, statsApi, ApiError };
