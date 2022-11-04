import { ItemsCard } from './ItemsCard';
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
      emptyDisplayMessage="Nothing Due This Week"
    >
      {({ items }) =>
        items.map((item) => <ItemDueNextSevenDays key={item.id} item={item} />)
      }
    </ItemsCard>
  );
};
