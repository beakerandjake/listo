import { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { itemApi } from 'api';
import {
  itemSortingFields,
  sortingDirections,
  sortItems,
} from 'services/sorting';
import { AddItem } from './AddItem';
import { ActionsDropdown } from './ActionsDropdown';
import { EditItemDrawer } from './EditItemDrawer';
import { LoadingSkeleton } from './LoadingSkeleton';
import { SortItemsDropdown } from './SortItemsDropdown';
import { GroupedItemsDisplay } from './GroupedItemsDisplay';
import { Title } from './Title';
import { getIcon } from 'services/iconLibrary';

const defaultSorting = {
  itemKey: itemSortingFields.created,
  direction: sortingDirections.asc,
};

export function List(props) {
  const loaderData = useLoaderData();
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeSort, setActiveSort] = useState(defaultSorting);
  const handleError = useErrorHandler();

  // whenever our loader data changes reset our state. 
  // this ensures that the data stays current whenever the route changes.
  useEffect(() => {
    setList(loaderData.list);
    setItems(loaderData.items);
    setActiveSort(defaultSorting);
  }, [loaderData]);

  // whenever the list items or the active sort changes, update the sortedItems list.
  // this ensures list items are always sorted according to the activeSort.
  const sortedItems = useMemo(() => {
    if (!items) {
      return [];
    }
    return sortItems(items, activeSort.itemKey, activeSort.direction);
  }, [items, activeSort]);

  /**
   * Add a new item to the list.
   * @param {object} item - The item to add to the list.
   **/
  const addItem = async (item) =>
    itemApi
      .addItem(list.id, item)
      .then((newItem) => setItems([...items, newItem]))
      .catch(handleError);

  /**
   * Edit the item.
   * @param {number} itemId - The id of the item to edit.
   * @param {object} changes - The changes to apply to the item.
   **/
  const editItem = async (itemId, changes) =>
    itemApi
      .editItem(itemId, changes)
      .then((newItem) =>
        setItems(items.map((x) => (x.id === itemId ? newItem : x)))
      )
      .catch(handleError);

  /**
   * Deletes an item from the list.
   * @param {number} itemId - The item to delete from the list.
   **/
  const deleteItem = (itemId) =>
    itemApi
      .deleteItem(itemId)
      .then(() => {
        setSelectedItemId(null);
        setItems(items.filter((x) => x.id !== itemId));
      })
      .catch(handleError);

  /**
   * Deletes many items from the list.
   * @param {string} filter - Optional filtering to change which items get deleted.
   **/
  const bulkDeleteItems = (filter) =>
    itemApi
      .bulkDeleteItems(list.id, filter)
      .then(() => {
        setItems(
          items.filter((x) => {
            // When bulk deleting with no filter, keep no items.
            if (!filter) {
              return false;
            }

            // When bulk deleting with completed filter, only keep active items.
            return filter === 'completed' && !x.completed;
          })
        );
      })
      .catch(handleError);

  /**
   * Bulk action to set the complete field of all items in the list.
   * @param {boolean} completed
   **/
  const bulkEditItems = (changes) =>
    itemApi
      .bulkEditItems(list.id, changes)
      // Reload all items after a bulk edit.
      .then(() => itemApi.getItems(list.id))
      .then(setItems)
      .catch(handleError);

  /**
   * Returns the currently selected item (if any)
   * @param {number} itemId - The if of the selected item (if any)
   * @returns {object}
   **/
  const getSelectedItem = (itemId) => {
    return items.find((x) => x.id === itemId);
  };

  // Render skeleton if still loading.
  if (!list) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Render reverse so flipped Items don't render on top. */}
      <div className="flex flex-col-reverse gap-2 mb-5">
        <GroupedItemsDisplay
          items={sortedItems}
          onItemSelected={setSelectedItemId}
          onItemChange={editItem}
        />

        <AddItem onAddItem={addItem} />

        {/* Header Section */}
        <div className="flex flex-1 flex-wrap items-center justify-between gap-3 mb-1 sm:mb-3">
          <div className="flex items-center gap-3">
            <Title icon={getIcon(list.iconName)} name={list.name} />
            <ActionsDropdown
              items={sortedItems}
              onBulkEdit={bulkEditItems}
              onBulkDelete={bulkDeleteItems}
            />
          </div>
          {/* Only render dropdown if items exist. */}
          {sortedItems.length > 0 && (
            <SortItemsDropdown
              activeSort={activeSort}
              onChange={setActiveSort}
            />
          )}
        </div>
      </div>

      <EditItemDrawer
        item={getSelectedItem(selectedItemId)}
        onClose={() => setSelectedItemId(null)}
        onDeleteItem={() => deleteItem(selectedItemId)}
        onEditItem={(changes) => editItem(selectedItemId, changes)}
      />
    </>
  );
}
