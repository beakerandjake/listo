import { ApiError } from 'api';
import { getList, mockLists, mockItems, setMockItems } from './mockDataStore';

/**
 * Does a list exists with the given id?
 * @param {Number} listId
 * @returns {Boolean}
 */
const listExists = (listId) =>
  mockLists().some((x) => x.id === parseInt(listId));

/**
 * Loads all of the items in a list.
 * @param {number} listId - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
const getItems = async (listId) => {
  if (!listExists(listId)) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  return mockItems().filter((x) => x.listId === parseInt(listId));
};

/**
 * Add a new item to the list.
 * @param {number} listId - The id of the list.
 * @param {object} item - The item to add to the list.
 * @returns {Promise<object>}
 **/
const addItem = async (listId, item) => {
  if (!listExists(listId)) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  // see if list already has an active item with the same name.
  const existingItem = mockItems().find(
    (x) =>
      x.listId === parseInt(listId) &&
      x.completed === false &&
      x.name.toLowerCase() === item.name.trim().toLowerCase()
  );

  // if item already exists, increment the quantity instead of adding duplicate.
  if (existingItem) {
    return editItem(existingItem.id, { quantity: existingItem.quantity + 1 });
  }

  // otherwise, add the new item to the items array

  const newItem = {
    id: Math.max(...mockItems().map((x) => x.id), 0) + 1,
    listId: listId,
    createDate: new Date().toISOString(),
    completed: false,
    ...item,
  };

  setMockItems([...mockItems(), newItem]);

  return newItem;
};

/**
 * Deletes an item from the list.
 * @param {number} itemId - The id of the item.
 **/
const deleteItem = async (itemId) => {
  setMockItems(mockItems().filter((x) => x.id !== itemId));
};

/**
 * Edits an item.
 * @param {number} itemId - The id of the list.
 * @param {object} changes - The edits to apply to an item.
 * @returns {Promise<object>}
 **/
const editItem = async (itemId, changes) => {
  const itemToEdit = mockItems().find((x) => x.id === itemId);

  if (!itemToEdit) {
    throw new ApiError('Could not find item with that Id.', 404);
  }

  const newItem = {
    ...itemToEdit,
    ...changes,
    completedDate: changes.completed ? new Date().toISOString() : null,
  };

  setMockItems(mockItems().map((x) => (x.id === newItem.id ? newItem : x)));

  return newItem;
};

/**
 * Deletes many items from the list.
 * @param {number} listId - The id of the list.
 * @param {string} filter - Optional filtering to change which items get deleted.
 **/
const bulkDeleteItems = async (listId, filter) => {
  if (!filter) {
    setMockItems([]);
  } else if (filter === 'completed') {
    setMockItems(mockItems().filter((x) => !x.completedDate));
  } else if (filter === 'active') {
    setMockItems(mockItems().filter((x) => !!x.completedDate));
  } else {
    throw new ApiError('Unknown filter', 400);
  }
};

/**
 * Edits many items from the list.
 * @param {number} listId - The id of the list.
 * @param {object} changes - Edits to apply to all items in the list.
 **/
const bulkEditItems = async (listId, changes) => {
  if (!listExists(listId)) {
    throw new ApiError('Could not find list with that Id.', 404);
  }

  setMockItems(
    mockItems().map((item) =>
      item.listId === parseInt(listId) ? { ...item, ...changes } : item
    )
  );
};

const api = {
  getItems,
  addItem,
  deleteItem,
  editItem,
  bulkDeleteItems,
  bulkEditItems,
  //   getItemsDueToday,
  //   getOverdueItems,
  //   getItemsDueNextSevenDays,
};

export default api;
