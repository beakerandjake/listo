import { faCalendarWeek } from '@fortawesome/pro-regular-svg-icons';
import { ItemsCard } from './ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueNextSevenDays } from './ItemDueNextSevenDays';

/**
 * Shows items across all lists which are due in the next seven days.
 * @param {object} props
 * @param {object[]} props.items - The items which are due today.
 * @param {function} props.onItemCompleted - Callback invoked when the user changes an items completed status.
 */
export const ItemsDueNextSevenDaysCard = (props) => {
  return (
    <ItemsCard
      {...props}
      title="Next Seven Days"
      emptyDisplay={
        <NoItemsDisplay
          icon={faCalendarWeek}
          heading="No Items Due This Week"
        />
      }
    >
      {({ items }) =>
        items.map((item) => <ItemDueNextSevenDays key={item.id} item={item} />)
      }
    </ItemsCard>
  );
};
