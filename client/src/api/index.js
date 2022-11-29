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

const useMockApi = process.env.REACT_APP_API_IMPLEMENTATION === 'mock';

const listApi = useMockApi ? mockListApi : realListApi;
const itemApi = useMockApi ? mockItemApi : realItemApi;
const statsApi = useMockApi ? mockStatsApi : realStatsApi;

export { listApi, itemApi, statsApi, ApiError };
