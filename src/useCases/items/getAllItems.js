import { itemRepository, listRepository } from '../../repositories/index.js';
import { itemModel } from '../../models/index.js';
import { NotFoundError } from '../../errors/NotFound.js';

/**
 * Returns all of the items in the list.
 * @returns {Array}
 */
export const getAllItems = (listId) => {
  if (!listRepository.existsWithId(listId)) {
    throw new NotFoundError('List does not exist');
  }

  return itemRepository
    .getAllItems(listId)
    .map(itemModel);
};
