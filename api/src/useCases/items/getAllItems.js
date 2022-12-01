import { logger } from '../../logger.js';
import { getItemsFilter, itemModel } from '../../models/index.js';
import { itemRepository } from '../../repositories/index.js';
import { ApplicationError } from '../../errors/ApplicationError.js';

/**
 * Returns items across all lists based on a filter criteria.
 * @returns {object}
 */
export const getAllItems = (filter) => {
  logger.info('getting items according to filter: %s', filter);

  const filterModel = getItemsFilter(filter);

  let result;

  if (filterModel.dueBefore && !filterModel.dueAfter) {
    result = itemRepository.getOverdueItems(filterModel.dueBefore);
  } else if (filterModel.dueBefore && filterModel.dueAfter) {
    result = itemRepository.getItemsByDueDateRange(filterModel.dueAfter, filterModel.dueBefore);
  } else {
    // specifying only dueAfter is currently not implemented.
    throw new ApplicationError('Filtering only by "dueAfter" is not supported');
  }

  logger.info('got: %d item(s) according to filter: %s', result.length, filter);

  return result.map(itemModel);
};
