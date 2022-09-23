import { itemRepository } from '../../repositories/index.js';
import { itemModel } from '../../models/index.js';

/**
 * Returns all of the items in the list.
 * @returns {Array}
 */
export const getAllItems = (listId) => {
  // todo does list exist?
  const result = itemRepository.getAllItems(listId);
  return result.map(itemModel);
};
