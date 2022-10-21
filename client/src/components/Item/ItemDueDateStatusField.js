import cx from 'classnames';
import { faCalendarCheck } from '@fortawesome/pro-regular-svg-icons';
import { formatDueDate, isDueToday, isOverdue } from 'services/dueDateHelpers';
import { ItemStatusField } from './ItemStatusField';

/**
 * Status field which displays the Item's due date
 * @param {Object} props
 * @param {boolean} props.completed - Has the Item been completed?
 * @param {string} props.dueDate - The due date of the Item.
 */
export const ItemDueDateStatusField = ({ completed, dueDate }) => {
  if (!dueDate) {
    return null;
  }

  return (
    <ItemStatusField
      icon={faCalendarCheck}
      text={formatDueDate(dueDate)}
      className={cx({
        'text-indigo-700': !completed && isDueToday(dueDate),
        'text-red-800': !completed && isOverdue(dueDate),
      })}
    />
  );
};
