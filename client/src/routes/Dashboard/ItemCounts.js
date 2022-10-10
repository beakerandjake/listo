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
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Item Stats
      </h3>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4 ">
        <StatCard name="Total Items" stat={total} />
        <StatCard name="Active Items" stat={active} />
        <StatCard name="Completed Items" stat={completed} />
        <StatCard name="Overdue Items" stat={overdue} />
      </dl>
    </div>
  );
};
