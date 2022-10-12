import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { faCat } from '@fortawesome/pro-light-svg-icons';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { getIcon } from 'services/iconLibrary';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import {
  listItemsActions,
  listItemsReducer,
  ListItemsDispatchContext,
  ListItemsContext,
} from 'context/ListItemsContext';
import { AddItem } from './AddItem';
import { ActionsDropdown } from './ActionsDropdown';
import { EditItemDrawer } from './EditItemDrawer';
import { SortItemsDropdown } from './SortItemsDropdown';
import { GroupedItemsDisplay } from './GroupedItemsDisplay';
import { Title } from './Title';
import { NoItemsDisplay } from './NoItemsDisplay';

// Defines the default field to sort a list on.
const defaultSorting = {
  itemKey: itemSortingFields.created,
  direction: sortingDirections.asc,
};

/**
 * Component which allows CRUD operations on a List.
 */
export const List = () => {
  const loaderData = useLoaderData();
  const [list, setList] = useState(loaderData.list);
  const [items, listItemsDispatch] = useReducer(
    listItemsReducer,
    loaderData.items
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSort, setActiveSort] = useState(defaultSorting);
  const updateSidebarItems = useUpdateSidebarItems();

  // create a wrapper around the listItemsDispatch that
  // will also update the sidebar items, this will keep the
  // sidebar item count in sync anytime our items change.
  const listItemsDispatchWrapper = useCallback(
    (args) => {
      listItemsDispatch(args);
      updateSidebarItems();
    },
    [listItemsDispatch, updateSidebarItems]
  );

  // reset internal state whenever a new list route is navigated to.
  useEffect(() => {
    setSelectedItem(null);
    setActiveSort(defaultSorting);
    listItemsDispatch({
      type: listItemsActions.replace,
      items: loaderData.items,
    });
    setList(loaderData.list);
  }, [loaderData]);

  // update the selected item any time items change
  useEffect(() => {
    setSelectedItem((previous) => items.find((x) => x.id === previous?.id));
  }, [items]);

  return (
    <ListItemsContext.Provider value={items}>
      <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
        {/* Render reverse so flipped Items don't render on top. */}
        <div className="flex flex-col-reverse gap-2 mb-5">
          <GroupedItemsDisplay
            items={items}
            sortingKey={activeSort.itemKey}
            sortingDirection={activeSort.direction}
            onItemSelected={setSelectedItem}
            noItemsDisplay={
              <NoItemsDisplay
                icon={faCat}
                heading="List Is Empty!"
                subHeading="Add some Items to get started."
              />
            }
          />

          <AddItem listId={list.id} />

          {/* Header Section */}
          <div className="flex flex-1 flex-wrap items-center justify-between gap-3 mb-1 sm:mb-3">
            <div className="flex items-center gap-3">
              <Title
                icon={getIcon(loaderData.list.iconName)}
                name={loaderData.list.name}
              />
              <ActionsDropdown listId={list.id} />
            </div>
            {/* Only render sorting dropdown if items exist. */}
            {items.length > 0 && (
              <SortItemsDropdown
                activeSort={activeSort}
                onChange={setActiveSort}
              />
            )}
          </div>
        </div>

        {/* Render drawer when an item is selected */}
        {selectedItem && (
          <EditItemDrawer
            item={selectedItem}
            onClosed={() => setSelectedItem(null)}
          />
        )}
      </ListItemsDispatchContext.Provider>
    </ListItemsContext.Provider>
  );
};
