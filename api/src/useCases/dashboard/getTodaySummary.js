import { logger } from '../../logger.js';
import { createItemCountStats } from '../../models/itemCountStats.js';
import { sqliteDashboardRepository } from '../../repositories/index.js';

/**
 * Returns items due today.
 * @returns {object}
 */
export const getItemCounts = () => {
  logger.info('getting item count stats');

  const result = sqliteDashboardRepository.getItemCounts();

  logger.info('got item count stats');

  return createItemCountStats(result);
};
