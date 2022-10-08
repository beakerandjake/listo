import { useEffect, useMemo, useReducer, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { AddItem } from './AddItem';
import { ActionsDropdown } from './ActionsDropdown';
import { EditItemDrawer } from './EditItemDrawer';
import { SortItemsDropdown } from './SortItemsDropdown';
import { GroupedItemsDisplay } from './GroupedItemsDisplay';
import { Title } from './Title';
import { getIcon } from 'services/iconLibrary';
import {
  sidebarItemsActions,
  useSidebarItemsDispatch,
} from 'context/SidebarItemsContext';
import {
  listItemsActions,
  listItemsReducer,
  ListItemsDispatchContext,
  ListItemsContext,
} from 'context/ListItemsContext';

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
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeSort, setActiveSort] = useState(defaultSorting);
  const sidebarItemsDispatch = useSidebarItemsDispatch();

  // update the sidebar active item count any time the items change.
  useEffect(() => {
    sidebarItemsDispatch({
      type: sidebarItemsActions.update,
      id: list.id,
      itemCount: items.filter((x) => !x.completed).length,
    });
  }, [items, list.id, sidebarItemsDispatch]);

  // reset internal state whenever a new list route is navigated to.
  useEffect(() => {
    setSelectedItemId(null);
    setActiveSort(defaultSorting);
    listItemsDispatch({
      type: listItemsActions.replace,
      items: loaderData.items,
    });
    setList(loaderData.list);
  }, [loaderData]);

  // ensure the selected item reference stays current with changes.
  const selectedItem = useMemo(
    () => items.find((x) => x.id === selectedItemId),
    [selectedItemId, items]
  );

  return (
    <ListItemsContext.Provider value={items}>
      <ListItemsDispatchContext.Provider value={listItemsDispatch}>
        {/* Render reverse so flipped Items don't render on top. */}
        <div className="flex flex-col-reverse gap-2 mb-5">
          <GroupedItemsDisplay
            items={items}
            sortingKey={activeSort.itemKey}
            sortingDirection={activeSort.direction}
            onItemSelected={setSelectedItemId}
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
            onClosed={() => setSelectedItemId(null)}
          />
        )}
      </ListItemsDispatchContext.Provider>
    </ListItemsContext.Provider>
  );
};
