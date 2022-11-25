import { ApiError } from 'api';
import { mockData } from './mockDataStore';

const getLists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toReturn = mockData.map((x) => ({
    name: x.name,
    id: x.id,
    iconName: x.iconName,
    itemCount: x.items.filter((x) => !x.completed).length,
  }));
  return toReturn;
};

const getList = async (listId) => {
  const list = mockData.find((x) => x.id.toString() === listId?.toString());

  if (!list) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  return {
    id: list.id,
    name: list.name,
    iconName: list.iconName,
    count: list.items.filter((x) => !x.completed).length,
  };
};

const api = {
  getLists,
  getList,
};

export default api;
