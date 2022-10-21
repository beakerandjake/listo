import { faCalendarExclamation } from '@fortawesome/pro-regular-svg-icons';
import { ItemsCard } from './ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueToday } from './ItemDueToday';

/**
 * Shows items across all lists which are overdue.
 * @param {object} props - Pass through props to the ItemsCard.
 */
export const ItemsCardOverdue = (props) => {
  return (
    <ItemsCard
      {...props}
      title="Overdue"
      emptyDisplay={
        <NoItemsDisplay
          icon={faCalendarExclamation}
          heading="No Overdue Items!"
        />
      }
    >
      {({ items }) =>
        items.map((item) => <ItemDueToday key={item.id} item={item} />)
      }
    </ItemsCard>
  );
};
