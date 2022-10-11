import { startOfToday } from 'date-fns';
import { logger } from '../../logger.js';
import { itemModel } from '../../models/index.js';
import { sqliteDashboardRepository } from '../../repositories/index.js';

/**
 * Returns overdue items across all lists.
 * @returns {object}
 */
export const getOverdueItems = () => {
  logger.info('getting overdue items');

  const result = sqliteDashboardRepository.getOverdueItems(
    startOfToday().toISOString(),
  );

  logger.info('got: %d overdue item(s).', result.length);

  return result.map(itemModel);
};
