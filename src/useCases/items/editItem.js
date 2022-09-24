import { NotFoundError } from '../../errors/NotFound.js';
import { logger } from '../../logger.js';
import { editItemModel } from '../../models/editItem.js';
import { itemRepository } from '../../repositories/index.js';

/**
 * Applies edits to an item.
 * @param {number} id - The id of item to edit.
 * @param {object} edits - The edits to apply to the item.
 */
export const editItem = (id, edits) => {
  logger.info('editing item: %s with changes: %s', id, edits);

  const { id: itemId, ...editModel } = editItemModel({ id, ...edits });

  const success = itemRepository.editItem(itemId, editModel);

  if (!success) {
    throw new NotFoundError(`Could not find an Item with id: ${itemId}`);
  }

  logger.info('edited item: %s', itemId);
};
