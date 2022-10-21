import { faCalendarDay } from '@fortawesome/pro-regular-svg-icons';
import { ItemsCard } from './ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueToday } from './ItemDueToday';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 * @param {object[]} props.items - The items which are due today.
 * @param {function} props.onItemCompleted - Callback invoked when the user changes an items completed status.
 */
export const ItemsDueTodayCard = (props) => {
  return (
    <ItemsCard
      {...props}
      title="Due Today"
      emptyDisplay={
        <NoItemsDisplay icon={faCalendarDay} heading="No Items Due Today!" />
      }
    >
      {({ items }) =>
        items.map((item) => <ItemDueToday key={item.id} item={item} />)
      }
    </ItemsCard>
  );
};