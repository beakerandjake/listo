import { startOfToday, endOfToday } from 'date-fns';
import { logger } from '../../logger.js';
import { itemModel } from '../../models/index.js';
import { itemRepository } from '../../repositories/index.js';

/**
 * Returns items due today across all lists.
 * @returns {object}
 */
export const getItemsDueToday = () => {
  logger.info('getting items due today');

  const result = itemRepository.getItemsByDueDateRange(
    startOfToday().toISOString(),
    endOfToday().toISOString(),
  );

  logger.info('got: %d item(s) due today', result.length);

  return result.map(itemModel);
};
