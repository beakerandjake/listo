import { NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { itemIdModel } from '../../models/index.js';
import { itemRepository } from '../../repositories/index.js';

/**
 * Attempts to delete an item with the specified id.
 * @param {number} id - The id of the item to delete.
 */
export const deleteItem = (id) => {
  logger.info('deleting item: %s', id);

  const itemId = itemIdModel(id);

  const success = itemRepository.deleteItem(itemId);

  if (!success) {
    throw new NotFoundError(`Could not find item with id: ${itemId}.`);
  }

  logger.info('deleted item: %s', itemId);
};
