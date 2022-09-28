import { getLists } from './listApi';
import { getItems } from './itemApi';

// TODO swap based on config

const listApi = {
  getLists,
};

const itemApi = {
  getItems,
};

export { listApi, itemApi };
