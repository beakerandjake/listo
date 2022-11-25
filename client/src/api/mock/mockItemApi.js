import { ApiError } from 'api';
import { mockData } from './mockDataStore';
/**
 * Loads all of the items in a list.
 * @param {number} listId - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
export const getItems = async (listId) => {
  const list = mockData.find((x) => x.id.toString() === listId?.toString());

  if (!list) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  return list.items;
};

/**
 * Add a new item to the list.
 * @param {number} listId - The id of the list.
 * @param {object} item - The item to add to the list.
 * @returns {Promise<object>}
 **/
const addItem = async (listId, item) => {
  const list = mockData.find((x) => x.id.toString() === listId?.toString());

  if (!list) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  const existingItem = list.items.find(
    (x) => x.name.toLowerCase() === item.name.trim().toLowerCase()
  );

  // if item already exists, update the quantity.
  if (existingItem) {
    existingItem.quantity += 1;
    return existingItem;
  }

  return {
    id: Math.max(...list.items.map((x) => x.id)) + 1,
    listId: listId,
    createDate: new Date().toISOString(),
    completed: false,
    ...item,
  };
};

const api = {
  getItems,
  addItem,
  //   deleteItem,
  //   editItem,
  //   bulkDeleteItems,
  //   bulkEditItems,
  //   getItemsDueToday,
  //   getOverdueItems,
  //   getItemsDueNextSevenDays,
};

export default api;
