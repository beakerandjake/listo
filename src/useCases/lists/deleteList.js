import { NotFoundError } from '../../errors/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to delete a list.
 * @param {number} id - The id of the list to delete.
 */
export const deleteList = (id) => {
  const success = listRepository.deleteList(id);

  if (!success) {
    throw new NotFoundError('List not found with that id.');
  }
};
