import { Badge } from 'components/Badge';
import { Card, CardHeader, CardHeading } from 'components/Card';
import { FlippedList } from 'components/FlippedList';

export const DashboardItemsCard = ({
  title,
  itemCount,
  emptyDisplay,
  children,
}) => {
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
