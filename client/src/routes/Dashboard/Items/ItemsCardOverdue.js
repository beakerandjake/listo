import { ItemsCard } from './ItemsCard';
import { ItemOverdue } from './ItemOverdue';

/**
 * Shows items across all lists which are overdue.
 * @param {object} props - Pass through props to the ItemsCard.
 */
export const ItemsCardOverdue = (props) => {
  return (
    <ItemsCard {...props} title="Overdue" emptyDisplayMessage="Nothing Overdue">
      {({ items }) =>
        items.map((item) => <ItemOverdue key={item.id} item={item} />)
      }
    </ItemsCard>
  );
};
