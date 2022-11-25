import { ApiError } from 'api';
import { mockData } from './mockDataStore';
/**
 * Loads all of the items in a list.
 * @param {number} listId - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
export const getItems = async (listId) => {
  const list = mockData.find((x) => x.id === listId);

  if (!list) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  return list.items;
};