import realListApi from './listApi';
import realItemApi from './itemApi';
import statsApi from './statsApi';
import { getLists, getList } from './mock/mockListApi';
import { getItems } from './mock/mockItemApi';

// TODO swap based on config

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const listApi = { ...realListApi, getLists, getList };
const itemApi = { ...realItemApi, getItems };

export { listApi, itemApi, statsApi, ApiError };
