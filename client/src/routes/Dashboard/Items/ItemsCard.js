import { Badge } from 'components/Badge';
import { Card, CardHeader, CardHeading } from 'components/Card';
import { FlippedList } from 'components/FlippedList';
import {
  listItemsActions,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useCallback, useReducer } from 'react';

/**
 * Card used to display a list of items.
 * @param {object} props
 * @param {string} props.title - The title of the item card.
 * @param {string|number} props.itemCount - The number of items in the card.
 * @param {ReactNode} props.emptyDisplay - Component to render if itemCount is less than one.
 * @param {ReactNode} props.children - Component to render if itemCount is greater than zero.
 */
export const ItemsCard = ({
  items: initialItems = [],
  title,
  emptyDisplay,
  children,
}) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);

  // The only events that we expect to be dispatched will result in the
  // item being removed from the list. So swallow the original dispatch
  // and instead dispatch a delete event instead.
  const dispatchWrapper = useCallback((arg) => {
    if (arg.type !== listItemsActions.edit) {
      throw new Error('unsupported action');
    }

    listItemsDispatch({ type: listItemsActions.delete, id: arg.item.id });
  }, []);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 select-none">
        <CardHeading>{title}</CardHeading>
        <Badge>{items.length}</Badge>
      </CardHeader>
      {items.length < 1 ? (
        emptyDisplay
      ) : (
        <ListItemsDispatchContext.Provider value={dispatchWrapper}>
          <FlippedList className="divide-y divide-gray-200 flex flex-col">
            {children({ items })}
          </FlippedList>
        </ListItemsDispatchContext.Provider>
      )}
    </Card>
  );
};
