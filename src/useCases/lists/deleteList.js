import { NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { listIdModel } from '../../models/listId.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to delete a list.
 * @param {number} id - The id of the list to delete.
 */
export const deleteList = (id) => {
  logger.info('deleting list: %s', id);

  const listId = listIdModel(id);

  const success = listRepository.deleteList(listId);

  if (!success) {
    throw new NotFoundError(`Could not find list with id: ${listId}.`);
  }

  logger.info('deleted list: %d', listId);
};
