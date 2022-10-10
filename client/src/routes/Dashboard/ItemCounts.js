import { StatCard } from './StatCard';

/**
 *
 * @param {object} props
 * @param {number} total - The total number of items
 * @param {number} total - The total number of items
 * @param {number} total - The total number of items
 * @param {number} total - The total number of items
 */
export const ItemCounts = ({
  total = 0,
  active = 0,
  completed = 0,
  overdue = 0,
}) => {
  return (
    <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard name="Total Items" stat={total} />
      <StatCard name="Active Items" stat={active} variant="secondary" />
      <StatCard name="Completed Items" stat={completed} variant="primary" />
      <StatCard name="Overdue Items" stat={overdue} variant="danger" />
    </dl>
  );
};
