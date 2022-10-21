import { Badge } from 'components/Badge';
import { Card, CardHeader, CardHeading } from 'components/Card';
import { FlippedList } from 'components/FlippedList';

/**
 * Card used to display a list of items.
 * @param {object} props
 * @param {string} props.title - The title of the item card.
 * @param {string|number} props.itemCount - The number of items in the card.
 * @param {ReactNode} props.emptyDisplay - Component to render if itemCount is less than one.
 * @param {ReactNode} props.children - Component to render if itemCount is greater than zero.
 */
export const ItemsCard = ({ title, itemCount, emptyDisplay, children }) => {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 select-none">
        <CardHeading>{title}</CardHeading>
        <Badge>{itemCount}</Badge>
      </CardHeader>
      {itemCount < 1 ? (
        emptyDisplay
      ) : (
        <FlippedList className="divide-y divide-gray-200 flex flex-col">
          {children}
        </FlippedList>
      )}
    </Card>
  );
};
