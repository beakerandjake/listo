import realListApi from './listApi';
import realItemApi from './itemApi';
import realStatsApi from './statsApi';
import mockListApi from './mock/mockListApi';
import mockItemApi from './mock/mockItemApi';
import mockStatsApi from './mock/mockStatsApi';

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// If bundle size becomes an issue could figure out a way to conditionally require
// The correct API based on the config, but for not a simple switch will be fine. 

const listApi = process.env.REACT_APP_USE_MOCK_API ? mockListApi : realListApi;
const itemApi = process.env.REACT_APP_USE_MOCK_API ? mockItemApi : realItemApi;
const statsApi = process.env.REACT_APP_USE_MOCK_API
  ? mockStatsApi
  : realStatsApi;

export { listApi, itemApi, statsApi, ApiError };
