import { startOfToday } from 'date-fns';
import { logger } from '../../logger.js';
import { itemModel } from '../../models/index.js';
import { itemRepository } from '../../repositories/index.js';

/**
 * Returns overdue items across all lists.
 * @returns {object}
 */
export const getOverdueItems = () => {
  logger.info('getting overdue items');

  const result = itemRepository.getOverdueItems(
    startOfToday().toISOString(),
  );

  logger.info('got: %d overdue item(s).', result.length);

  return result.map(itemModel);
};
