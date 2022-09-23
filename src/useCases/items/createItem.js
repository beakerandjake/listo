import { NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { createItemRequestModel, itemModel } from '../../models/index.js';
import { itemRepository, listRepository } from '../../repositories/index.js';

/**
 * Creates a new Item.
 * @param {number} listId - The id of the list to add Items to.
 * @param {object} item - The item to create.
 * @returns {object}
 */
export const createItem = (listId, item) => {
  logger.info('attempting to add item: %s to list: %s', item, listId);

  const addModel = createItemRequestModel({ listId, ...item });

  if (!listRepository.existsWithId(addModel.listId)) {
    throw new NotFoundError('List does not exist');
  }

  // TODO update quantity if posting a duplicate.
  const newItemId = itemRepository.createItem(addModel);
  const newItem = itemRepository.getItem(newItemId);

  logger.info('added item: %s to list: %s', newItem, listId);

  return itemModel(newItem);
};
