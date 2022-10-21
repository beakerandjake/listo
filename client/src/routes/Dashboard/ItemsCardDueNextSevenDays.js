import { useCallback, useReducer } from 'react';
import {
  faCalendarDay,
  faCalendarWeek,
} from '@fortawesome/pro-regular-svg-icons';
import {
  listItemsActions,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { ItemsCard } from './Items/ItemsCard';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { ItemDueToday } from './ItemDueToday';

/**
 * Shows items across all lists which are due in the next seven days.
 * @param {object} props
 * @param {object[]} props.items - The items to display.
 * @param {function} props.onItemCompleted - Callback invoked when the user changes an items completed status.
 */
export const ItemsCardDueNextSevenDays = ({
  items: initialItems = [],
  onItemCompleted = () => {},
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
    <ListItemsDispatchContext.Provider value={dispatchWrapper}>
      <ItemsCard
        title="Next Seven Days"
        itemCount={items.length}
        emptyDisplay={
          <NoItemsDisplay
            icon={faCalendarWeek}
            heading="No Items Due This Week"
          />
        }
      >
        {items.map((item) => (
          <ItemDueToday key={item.id} item={item} />
        ))}
      </ItemsCard>
    </ListItemsDispatchContext.Provider>
  );
};
