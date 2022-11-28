import { ApiError } from 'api';
import { mockLists, mockItems } from './mockDataStore';

/**
 * Counts the number of items in the given list.
 * @param {number} listId
 * @returns {number}
 */
const itemCount = (listId) =>
  mockItems().filter((x) => x.listId === listId && !x.completed).length;

/**
 * Loads all of the lists.
 * @returns {Promise<object[]>}
 **/
const getLists = async () =>
  mockLists().map((list) => ({
    ...list,
    itemCount: itemCount(list.id),
  }));

/**
 * Loads the list.
 * @param {number} id - The id of the list to load.
 * @returns {Promise<object>}
 **/
const getList = async (listId) => {
  const list = mockLists().find((x) => x.id === parseInt(listId));

  if (!list) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  return { ...list, count: itemCount(list.id) };
};

const api = {
  getLists,
  getList,
};

export default api;
