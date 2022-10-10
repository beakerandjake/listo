import { ApiError } from 'api';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/dashboard`;

/**
 * Returns the item count stats.
 * @returns {Promise<object>}
 **/
const getItemCounts = async () => {
  const response = await fetch(`${baseUrl}/item-counts`);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Returns all of the items due today across all lists.
 * @returns {Promise<object>}
 **/
const getItemsDueToday = async () => {
  const response = await fetch(`${baseUrl}/due-today`);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

const api = {
  getItemCounts,
  getItemsDueToday,
};

export default api;
