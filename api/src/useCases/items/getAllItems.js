import { startOfToday, endOfToday } from 'date-fns';
import { logger } from '../../logger.js';
import { getItemsFilter, itemModel } from '../../models/index.js';
import { itemRepository } from '../../repositories/index.js';
import { filters } from '../../models/getItemsFilter.js';
import { ApplicationError } from '../../errors/ApplicationError.js';

/**
 * Returns items across all lists based on a filter criteria.
 * @returns {object}
 */
export const getAllItems = (filter) => {
  logger.info('getting items according to filter: %s', filter);

  const filterModel = getItemsFilter(filter);
  let result;

  switch (filterModel) {
    case filters.overdue:
      result = itemRepository.getOverdueItems(
        startOfToday().toISOString(),
      );
      break;
    case filters.dueToday:
      result = itemRepository.getItemsByDueDateRange(
        startOfToday().toISOString(),
        endOfToday().toISOString(),
      );
      break;
    default:
      throw new ApplicationError(`getAllItems got unimplemented filter: ${filter}`);
  }

  logger.info('got: %d item(s) according to filter: %s', result.length, filter);

  return result.map(itemModel);
};
