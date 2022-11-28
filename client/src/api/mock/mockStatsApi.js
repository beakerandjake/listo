import { differenceInMilliseconds, parseISO } from 'date-fns';
import { isOverdue } from 'services/dueDateHelpers';
import { mockItems } from './mockDataStore';

/**
 * Returns the item count stats.
 * @returns {Promise<object>}
 **/
const getItemCounts = async () =>
  mockItems().reduce(
    (acc, value) => {
      acc.total += 1;
      acc.active += value.completed ? 0 : 1;
      acc.completed += value.completed ? 1 : 0;
      acc.overdue +=
        !value.completed && value.dueDate && isOverdue(value.dueDate) ? 1 : 0;
      return acc;
    },
    { total: 0, active: 0, completed: 0, overdue: 0 }
  );

/**
 * Returns the average item completion time stats.
 * @returns {Promise<object>}
 **/
const getAverageItemCompletionTime = async () => {
  const completionTimes = mockItems()
    .filter((x) => x.dueDate && x.completed)
    .map((x) =>
      differenceInMilliseconds(
        parseISO(x.completedDate),
        parseISO(x.createdDate)
      )
    );

  if (!completionTimes.length) {
    return { timeInMs: 0 };
  }

  return {
    timeInMs:
      completionTimes.reduce((acc, val) => acc + val) / completionTimes.length,
  };
};

const api = {
  getItemCounts,
  getAverageItemCompletionTime,
};

export default api;
