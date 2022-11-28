import { isPast } from 'date-fns';
import { isOverdue } from 'services/dueDateHelpers';
import { mockItems } from './mockDataStore';

/**
 * Returns the item count stats.
 * @returns {Promise<object>}
 **/
const getItemCounts = async () => {
  return mockItems().reduce(
    (acc, value) => {
      acc.total += 1;
      acc.active += value.completed ? 0 : 1;
      acc.completed += value.completed ? 1 : 0;
      acc.overdue +=
        !value.completed && value.dueDate && isOverdue(value.dueDate) ? 1 : 0;
      return acc;
    },
    {
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0,
    }
  );
};

/**
 * Returns the average item completion time stats.
 * @returns {Promise<object>}
 **/
const getAverageItemCompletionTime = async () => {
  return {};
};

const api = {
  getItemCounts,
  getAverageItemCompletionTime,
};

export default api;
