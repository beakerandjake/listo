import { faCalendarDay } from '@fortawesome/pro-regular-svg-icons';
import { ItemsCard } from './ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueToday } from './ItemDueToday';

/**
 * Shows items across all lists which are due today.
 * @param {object} props - Pass through props to the ItemsCard.
 * @param {function} props.onItemDueDatePostponed - Function invoked when the user postpones the due date of an item.
 */
export const ItemsCardDueToday = ({ onItemDueDatePostponed, ...props }) => {
  return (
    <ItemsCard
      {...props}
      title="Due Today"
      emptyDisplay={
        <NoItemsDisplay icon={faCalendarDay} heading="No Items Due Today!" />
      }
    >
      {({ items }) =>
        items.map((item) => (
          <ItemDueToday
            key={item.id}
            item={item}
            onDueDatePostponed={onItemDueDatePostponed}
          />
        ))
      }
    </ItemsCard>
  );
};
