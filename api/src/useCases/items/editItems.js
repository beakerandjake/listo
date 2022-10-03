import { NotFoundError } from '../../errors/NotFound.js';
import { editItemsModel, listIdModel } from '../../models/index.js';
import { itemRepository, listRepository } from '../../repositories/index.js';
import { logger } from '../../logger.js';

/**
 * Bulk edits items of the list.
 * @param {number} id - The id of the list.
 * @param {changes} changes - Changes to apply to all items of the list.
 */
export const editItems = (id, changes) => {
  logger.info('editing items from list: %s with changes: %s', id, changes);

  const listId = listIdModel(id);
  const changesModel = editItemsModel(changes);

  if (!listRepository.existsWithId(listId)) {
    throw new NotFoundError('List does not exist');
  }

  const editCount = itemRepository.editItems(listId, changesModel);

  logger.info('edited %d item(s) from list: %s', editCount, listId);
};
