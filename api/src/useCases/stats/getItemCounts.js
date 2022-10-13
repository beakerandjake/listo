import { logger } from '../../logger.js';
import { createItemCountStats } from '../../models/itemCountStats.js';
import { statsRepository } from '../../repositories/index.js';

/**
 * Returns counts of current non-deleted items for all lists.
 * @returns {object}
 */
export const getItemCounts = () => {
  logger.info('getting item count stats');

  const result = statsRepository.getItemCounts();

  logger.info('got item count stats');

  return createItemCountStats(result);
};
