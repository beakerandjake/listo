import { listRepository } from '../../repositories/index.js';
import { listModel } from '../../models/index.js';
import { logger } from '../../logger.js';

/**
 * Returns all of the lists which have not been marked as deleted.
 * @returns {Array} - All of the non-deleted lists.
 */
export const getAllLists = () => {
  logger.info('getting all lists');

  const items = listRepository
    .getLists()
    .map(listModel);

  logger.info('got lists: %s', items);

  return items;
};
