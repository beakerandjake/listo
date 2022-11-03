import {
  faCheck,
  faList,
  faAlarmExclamation,
  faListCheck,
} from '@fortawesome/pro-regular-svg-icons';
import { useMemo } from 'react';
import { StatCard } from './StatCard';

const toPercentString = (numerator, denominator) => {
  if (denominator === null || denominator === undefined) {
    return null;
  }

  if (denominator === 0) {
    return '0';
  }

  return `${Math.round((numerator / denominator) * 100)}%`;
};

/**
 * Container which displays StatCards for the item counts.
 * @param {object} props
 * @param {number} total - The total number of items.
 * @param {number} active - The total number of active items.
 * @param {number} completed - The total number of completed items.
 * @param {number} overdue - The total number of overdue items.
 */
export const ItemCounts = ({ total, active, completed, overdue }) => {
  const percentOverdue = useMemo(
    () => toPercentString(overdue, total),
    [total, overdue]
  );

  const percentCompleted = useMemo(
    () => toPercentString(completed, total),
    [total, completed]
  );

  const percentActive = useMemo(
    () => toPercentString(active, total),
    [total, active]
  );

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard name="Total Items" stat={total} icon={faListCheck} />
      <StatCard
        name="Overdue"
        stat={percentOverdue}
        variant="danger"
        icon={faAlarmExclamation}
      />
      <StatCard
        name="Active"
        stat={percentActive}
        variant="secondary"
        icon={faList}
      />
      <StatCard
        name="Completed"
        stat={percentCompleted}
        variant="primary"
        icon={faCheck}
      />
    </dl>
  );
};
