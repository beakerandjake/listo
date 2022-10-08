import { useEffect, useReducer, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { itemApi } from 'api';
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
  const handleError = useErrorHandler();

  // ensure the sidebar item count stays in sync with this lists item count.
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

  /**
   * Edit the item.
   * @param {number} itemId - The id of the item to edit.
   * @param {object} changes - The changes to apply to the item.
   **/
  const editItem = async (itemId, changes) =>
    itemApi
      .editItem(itemId, changes)
      .then((newItem) =>
        listItemsDispatch({ type: listItemsActions.edit, item: newItem })
      )
      .catch(handleError);

  /**
   * Returns the currently selected item (if any)
   * @param {number} itemId - The if of the selected item (if any)
   * @returns {object}
   **/
  const getSelectedItem = (itemId) => {
    return items.find((x) => x.id === itemId);
  };

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
            onItemChange={editItem}
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
            {/* Only render dropdown if items exist. */}
            {items.length > 0 && (
              <SortItemsDropdown
                activeSort={activeSort}
                onChange={setActiveSort}
              />
            )}
          </div>
        </div>

        {/* Drawer will open when an item is selected */}
        {selectedItemId && (
          <EditItemDrawer
            item={getSelectedItem(selectedItemId)}
            onClose={() => setSelectedItemId(null)}
          />
        )}
      </ListItemsDispatchContext.Provider>
    </ListItemsContext.Provider>
  );
};
