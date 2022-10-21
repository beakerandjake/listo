import { useCallback, useReducer } from 'react';
import { faCalendarWeek } from '@fortawesome/pro-regular-svg-icons';
import {
  listItemsActions,
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { ItemCard } from './ItemCard';
import { Items } from 'routes/List/Items';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';

/**
 * Shows items across all lists which are due in the next seven days.
 * @param {object} props
 * @param {function} props.onItemChange - Callback invoked when the user changes an item.
 */
export const ItemsDueNextSevenDays = ({
  items: initialItems,
  onItemCompleted = () => {},
}) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useUpdateSidebarItems();

  // create wrapper around the listItemsDispatch function
  // to also dispatch updates to the sidebar to keep the
  // active item count in sync whenever list items change.
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
      // the only dispatch we care about is marking an item completed, ignore anything else.
      if (arg.type !== listItemsActions.edit && !arg.item.completed) {
        return;
      }

      // re dispatch the event as a delete, this will remove the overdue item from the list
      listItemsDispatch({ type: listItemsActions.delete, id: arg.item.id });
      sidebarItemsDispatch();
      onItemCompleted();
    },
    [sidebarItemsDispatch, onItemCompleted]
  );

  return (
    <ItemCard
      itemCount={items.length}
      title="Next Seven Days"
      emptyDisplay={
        <NoItemsDisplay
          icon={faCalendarWeek}
          heading="No Items Due This Week"
        />
      }
    >
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
          <Items items={items} />
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </ItemCard>
  );
};
