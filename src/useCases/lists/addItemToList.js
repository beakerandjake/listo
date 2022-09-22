import { NotFoundError } from '../../errors/index.js';
import { buildAddItem } from '../../models/index.js';
import { itemRepository, listRepository } from '../../repositories/index.js';

/**
 * Adds a new item to the list.
 * @param {number} listId - The id of the list to add Items to.
 * @returns {object} - An object containing the id of the newly created list.
 */
export const addItemToList = (listId, item) => {
  const addModel = buildAddItem({ listId, ...item });

  if (!listRepository.existsWithId(addModel.listId)) {
    throw new NotFoundError('List does not exist');
  }

  // TODO update quantity if posting a duplicate.

  return itemRepository.createItem(addModel);
};
