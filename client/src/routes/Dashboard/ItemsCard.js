import { Badge } from 'components/Badge';
import { CardHeading, CollapsibleCard } from 'components/Card';

/**
 * Collapsible card used for displaying items.
 * @param {object} props
 * @param {string} props.title - The title of the item card.
 * @param {string|number} props.itemCount - The number of items in the card.
 * @param {ReactNode} props.emptyDisplay - Component to render if itemCount is less than one.
 * @param {ReactNode} props.children - Component to render if itemCount is greater than zero.
 */
export const ItemsCard = ({
  title,
  itemCount: count,
  emptyDisplay,
  children,
}) => {
  return (
    <CollapsibleCard
      header={
        <div className="flex items-center gap-2">
          <CardHeading>{title}</CardHeading>
          <Badge>{count}</Badge>
        </div>
      }
    >
      {count < 1 ? { emptyDisplay } : { children }}
    </CollapsibleCard>
  );
};
