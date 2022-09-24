import { itemRepository, listRepository } from '../../repositories/index.js';
import { itemModel } from '../../models/index.js';
import { NotFoundError } from '../../errors/NotFound.js';
import { logger } from '../../logger.js';

/**
 * Returns all of the items in the list.
 * @returns {Array}
 */
export const getAllItems = (listId) => {
  logger.info('getting all items from list: %s', listId);

  if (!listRepository.existsWithId(listId)) {
    throw new NotFoundError('List does not exist');
  }

  const items = itemRepository
    .getAllItems(listId)
    .map(itemModel);

  logger.info('got %d item(s) from list: %s', items.length, listId);

  return items;
};
