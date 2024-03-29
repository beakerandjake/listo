import { Badge } from 'components/Badge';
import { Card, CardHeader, CardHeading } from 'components/Card';
import { FlippedList } from 'components/FlippedList';
import {
  listItemsActions,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useCallback, useEffect, useReducer } from 'react';

/**
 * Card used to display a list of items.
 * @param {object} props
 * @param {string} props.title - The title of the item card.
 * @param {string|number} props.itemCount - The number of items in the card.
 * @param {string} props.emptyDisplayMessage - Text to render if no items.
 * @param {ReactNode} props.children - Component to render if itemCount is greater than zero.
 */
export const ItemsCard = ({
  items: initialItems = [],
  title,
  emptyDisplayMessage,
  onItemCompleted,
  children,
}) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, []);

  // The only events that we expect to be dispatched will result in the
  // item being removed from the list. So swallow the original dispatch
  // and instead dispatch a delete event instead.
  const dispatchWrapper = useCallback(
    (arg) => {
      if (arg.type !== listItemsActions.edit) {
        throw new Error('unsupported action');
      }

      listItemsDispatch({ type: listItemsActions.delete, id: arg.item.id });
      onItemCompleted();
    },
    [onItemCompleted]
  );

  // any time the initial items change, replace our items with the initial values.
  useEffect(() => {
    listItemsDispatch({ type: listItemsActions.replace, items: initialItems });
  }, [initialItems]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 select-none">
        <CardHeading>{title}</CardHeading>
        <Badge>{items.length}</Badge>
      </CardHeader>
      {items.length < 1 ? (
        <h1 className="text-center p-6 text-lg font-bold text-gray-500">
          {emptyDisplayMessage}
        </h1>
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
