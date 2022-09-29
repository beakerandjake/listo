import { NotFoundError } from '../../errors/NotFound.js';
import { deleteItemsModel, listIdModel } from '../../models/index.js';
import { filters } from '../../models/deleteItems.js';
import { itemRepository, listRepository } from '../../repositories/index.js';
import { logger } from '../../logger.js';

/**
 * Bulk deletes items of the list.
 * @param {number} id - The id of the list.
 * @param {string} filter - Filter criteria to change which items get deleted.
 */
export const deleteItems = (id, filter) => {
  logger.info('deleting items from list: %s with filter: %s', id, filter);

  const listId = listIdModel(id);
  const deleteModel = deleteItemsModel({ listId, filter });

  if (!listRepository.existsWithId(listId)) {
    throw new NotFoundError('List does not exist');
  }

  let deleteCount = 0;

  switch (deleteModel.filter) {
    case filters.completed:
      logger.info('deleting items with "%s" filter', filters.completed);
      deleteCount = itemRepository.deleteCompleted(deleteModel.listId);
      break;
    case filters.active:
      logger.info('deleting items with "%s" filter', filters.active);
      deleteCount = itemRepository.deleteActive(deleteModel.listId);
      break;
    default:
      logger.info('deleting all items without filter');
      deleteCount = itemRepository.deleteAll(deleteModel.listId);
      break;
  }

  logger.info('deleted %d item(s) from list: %s', deleteCount, deleteModel.listId);
};
