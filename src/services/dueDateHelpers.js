import {
  differenceInCalendarDays,
  formatDistanceToNowStrict,
  isDate,
  isPast,
  isValid,
  parseISO,
} from 'date-fns';

/**
 * Returns a friendly string representation of the due date.
 * @param {Date|string} date - The due date (either a Date object or an ISO date string)
 */
export function formatDueDate(date) {
  const parsed = isDate(date) ? date : parseISO(date);

  if (!isValid(parsed)) {
    throw new Error('Invalid Date');
  }

  let toReturn;
  const dayDifference = differenceInCalendarDays(parsed, new Date());

  if (dayDifference === -1) {
    toReturn = 'Yesterday';
  } else if (dayDifference === 0) {
    return 'Today';
  } else if (dayDifference === 1) {
    return 'Tomorrow';
  } else {
    toReturn = formatDistanceToNowStrict(parsed, { addSuffix: true });
  }

  return (isPast(parsed) ? 'Overdue, ' : 'Due ') + toReturn;
}

/**
 * Is the give date in the past?
 * @param {Date|string} date - The due date (either a Date object or an ISO date string)
 */
export function isOverdue(date) {
  const parsed = isDate(date) ? date : parseISO(date);

  if (!isValid(parsed)) {
    throw new Error('Invalid Date');
  }

  return differenceInCalendarDays(parsed, new Date()) < 0;
}

/**
 * Is the given date today?
 * @param {Date|string} date - The due date (either a Date object or an ISO date string)
 */
export function isDueToday(date) {
  const parsed = isDate(date) ? date : parseISO(date);

  if (!isValid(parsed)) {
    throw new Error('Invalid Date');
  }

  return differenceInCalendarDays(parsed, new Date()) === 0;
}
