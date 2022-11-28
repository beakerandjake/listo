import realListApi from './listApi';
import realItemApi from './itemApi';
import realStatsApi from './statsApi';
import mockListApi from './mock/mockListApi';
import mockItemApi from './mock/mockItemApi';
import mockStatsApi from './mock/mockStatsApi';
// TODO swap based on config

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const listApi = { ...realListApi, ...mockListApi };
const itemApi = { ...realItemApi, ...mockItemApi };
const statsApi = { ...realStatsApi, ...mockStatsApi };

export { listApi, itemApi, statsApi, ApiError };
