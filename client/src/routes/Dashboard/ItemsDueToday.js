import { faCalendarDay } from '@fortawesome/pro-regular-svg-icons';
import { CollapsibleCard } from 'components/CollapsibleCard';
import {
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { useCallback, useReducer } from 'react';
import { GroupedItemsDisplay } from 'routes/List/GroupedItemsDisplay';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { ItemPanelHeader } from './ItemsPanelHeader';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 * @param {object[]} props.items - The items which are due today.
 * @param {function} props.onItemChange - Callback invoked when the user changes an item.
 */
export const ItemsDueToday = ({
  items: initialItems = [],
  onItemChange = () => {},
}) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useUpdateSidebarItems();

  // create wrapper around the listItemsDispatch function
  // to also dispatch updates to the sidebar to keep the
  // active item count in sync whenever list items change.
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
      listItemsDispatch(arg);
      sidebarItemsDispatch();
      onItemChange();
    },
    [listItemsDispatch, sidebarItemsDispatch, onItemChange]
  );

  return (
    <CollapsibleCard
      title={
        <ItemPanelHeader
          title="Items Due Today"
          itemCount={items.length}
          variant={items.length > 0 ? 'success' : 'default'}
        />
      }
      defaultOpen={items.length > 0}
    >
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
          <GroupedItemsDisplay
            sortingDirection={sortingDirections.asc}
            sortingKey={itemSortingFields.dueDate}
            items={items}
            noItemsDisplay={
              <NoItemsDisplay
                icon={faCalendarDay}
                heading="No Items Due Today!"
              />
            }
          />
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </CollapsibleCard>
  );
};
