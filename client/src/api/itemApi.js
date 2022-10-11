import { ApiError } from 'api';

const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

const itemsBaseUrl = `${apiBaseUrl}/items`;
const urlForItem = (itemId) => `${itemsBaseUrl}/${itemId}`;
const listItemsUrl = (listId) => `${apiBaseUrl}/lists/${listId}/items`;

/**
 * Loads all of the items in a list.
 * @param {number} listId - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
const getItems = async (listId) => {
  const response = await fetch(listItemsUrl(listId));

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Add a new item to the list.
 * @param {number} listId - The id of the list.
 * @param {object} item - The item to add to the list.
 * @returns {Promise<object>}
 **/
const addItem = async (listId, item) => {
  const response = await fetch(listItemsUrl(listId), {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Deletes an item from the list.
 * @param {number} itemId - The id of the item.
 **/
const deleteItem = async (itemId) => {
  const response = await fetch(urlForItem(itemId), {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
};

/**
 * Edits an item.
 * @param {number} itemId - The id of the list.
 * @param {object} changes - The edits to apply to an item.
 * @returns {Promise<object>}
 **/
const editItem = async (itemId, changes) => {
  const response = await fetch(urlForItem(itemId), {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Deletes many items from the list.
 * @param {number} listId - The id of the list.
 * @param {string} filter - Optional filtering to change which items get deleted.
 **/
const bulkDeleteItems = async (listId, filter) => {
  let url = listItemsUrl(listId);

  if (filter) {
    url = url.concat('?', new URLSearchParams({ filter }));
  }

  const response = await fetch(url, { method: 'DELETE' });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
};

/**
 * Edits many items from the list.
 * @param {number} listId - The id of the list.
 * @param {object} changes - Edits to apply to all items in the list.
 **/
const bulkEditItems = async (listId, changes) => {
  const response = await fetch(listItemsUrl(listId), {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
};

/**
 * Returns all of the items due today across all lists.
 * @returns {Promise<object>}
 **/
const getItemsDueToday = async () => {
  const response = await fetch(`${itemsBaseUrl}/due-today`);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Returns all of the items currently overdue.
 * @returns {Promise<object>}
 **/
const getOverdueItems = async () => {
  const response = await fetch(`${itemsBaseUrl}/overdue`);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

const api = {
  getItems,
  addItem,
  deleteItem,
  editItem,
  bulkDeleteItems,
  bulkEditItems,
  getItemsDueToday,
  getOverdueItems,
};

export default api;
