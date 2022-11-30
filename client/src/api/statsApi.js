import { ApiError } from 'api';
import { apiBaseUrl } from './apiConfig';

const baseUrl = `${apiBaseUrl}/stats`;

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
 * Returns the average item completion time stats.
 * @returns {Promise<object>}
 **/
const getAverageItemCompletionTime = async () => {
  const response = await fetch(`${baseUrl}/avg-completion-time`);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

const api = {
  getItemCounts,
  getAverageItemCompletionTime,
};

export default api;
