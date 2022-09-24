import { logger } from '../../logger.js';

/**
 * Applies edits to an item.
 * @param {number} id - The id of item to edit.
 * @param {object} edits - The edits to apply to the item.
 */
export const editItem = (id, edits) => {
  logger.info('editing item: %s with changes: %s', id, edits);
};
