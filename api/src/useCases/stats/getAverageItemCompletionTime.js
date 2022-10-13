import { logger } from '../../logger.js';
import { averageItemCompletionTime } from '../../models/index.js';
import { statsRepository } from '../../repositories/index.js';

const daysToMs = (days) => Math.round(days * 1000 * 60 * 60 * 24);

/**
 * Returns average amount of time to complete an item across all lists.
 * @returns {object}
 */
export const getAverageItemCompletionTime = () => {
  logger.info('getting average item completion time');

  const result = daysToMs(
    statsRepository.getAverageItemCompletionTime(),
  );

  logger.info('got average item completion time: %s', result);

  return averageItemCompletionTime({ timeInMs: result });
};
