import { listRepository } from '../../repositories/index.js';
import { getAllListsModel } from '../../models/index.js';

/**
 * Returns all of the lists which have not been marked as deleted.
 * @returns {Array} - All of the non-deleted lists.
 */
export const getAllLists = () => {
  const result = listRepository.getLists();
  return getAllListsModel(result);
};
