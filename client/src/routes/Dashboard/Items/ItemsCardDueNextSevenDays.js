import { faCalendarWeek } from '@fortawesome/pro-regular-svg-icons';
import { ItemsCard } from './ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueNextSevenDays } from './ItemDueNextSevenDays';

/**
 * Shows items across all lists which are due in the next seven days.
 * @param {object} props - Pass through props to the ItemsCard.
 */
export const ItemsCardDueNextSevenDays = (props) => {
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
