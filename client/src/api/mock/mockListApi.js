import { ApiError } from 'api';
import { mockLists, mockItems, setMockLists } from './mockDataStore';

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

/**
 * Creates a new list
 * @param {object} list - The list to create.
 * @returns {Promise<object>}
 **/
const createList = async ({ name, iconName }) => {
  const newList = {
    id: Math.max(...mockLists().map((x) => x.id)) + 1,
    name,
    iconName,
  };

  setMockLists([...mockLists(), newList]);

  return { ...newList, count: 0 };
};

/**
 * Edit the specified list.
 * @param {object} list - The list to edit.
 * @returns {Promise<object>}
 **/
const editList = async (id, changes) => {
  const existingList = mockLists().find((x) => x.id === parseInt(id));

  if (!existingList) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  const editedList = { ...existingList, ...changes };

  setMockLists(
    mockLists().map((x) => (x.id === existingList.id ? editedList : x))
  );

  return getList(existingList.id);
};

const api = {
  getLists,
  getList,
  createList,
  editList,
};

export default api;
