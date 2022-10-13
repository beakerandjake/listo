import { logger } from '../../logger.js';
import { averageItemCompletionTime } from '../../models/index.js';
import { statsRepository } from '../../repositories/index.js';

/**
 * Returns average amount of time to complete an item across all lists.
 * @returns {object}
 */
export const getAverageItemCompletionTime = () => {
  logger.info('getting average item completion time');

  const result = statsRepository.getAverageItemCompletionTime();

  logger.info('got average item completion time: %s', result);

  return averageItemCompletionTime(result);
};
