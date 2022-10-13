import { useCallback, useReducer } from 'react';
import { faCalendarExclamation } from '@fortawesome/pro-regular-svg-icons';
import {
  listItemsActions,
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { Items } from 'routes/List/Items';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { CollapsibleSection } from './CollapsibleSection';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 * @param {function} props.onItemChange - Callback invoked when the user changes an item.
 */
export const OverdueItems = ({
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
    <CollapsibleSection badgeCount={items.length} title="Overdue">
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
          {items.length < 1 ? (
            <NoItemsDisplay
              icon={faCalendarExclamation}
              heading="No Overdue Items!"
            />
          ) : (
            <Items items={items} />
          )}
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </CollapsibleSection>
  );
};
