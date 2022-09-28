import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { getList, setItemCompleted } from 'services/listService';
import { itemApi, listApi } from 'api';
import {
  itemSortingFields,
  sortingDirections,
  sortItems,
} from 'services/sorting';
import { AddItem } from './AddItem';
import { ConfirmDialog } from 'components/ConfirmDialog';
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
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState({ open: false });
  const [activeSort, setActiveSort] = useState(defaultSorting);
  const { id } = useParams();
  const handleError = useErrorHandler();

  // whenever the id changes, load the list.
  useEffect(() => {
    let skeletonMinDisplayTimerId;

    const skeletonMinDisplayTimer = new Promise((resolve) => {
      skeletonMinDisplayTimerId = setTimeout(resolve, 500);
    });

    Promise.all([
      itemApi.getItems(id),
      listApi.getList(id),
      skeletonMinDisplayTimer,
    ])
      .then((values) => {
        setItems(values[0]);
        setList(values[1]);
        setActiveSort(defaultSorting);
      })
      .catch((error) => handleError(error));

    return () => {
      clearTimeout(skeletonMinDisplayTimerId);
      setList(null);
      setItems(null);
    };
  }, [id, handleError]);

  // whenever the list items or the active sort changes, update the sortedItems list.
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

  const onSetItemCompleted = async (itemId, completed) => {
    try {
      setItems(items.map((x) => (x.id === itemId ? { ...x, completed } : x)));
      await setItemCompleted(id, itemId, completed);
    } catch (error) {
      handleError(error);
    }
  };

  // todo, can probably merge with onSetItemComplete and just take array.
  const setItemsCompleted = async (itemIds, completed) => {
    try {
      setItems(
        items.map((x) => (itemIds.includes(x.id) ? { ...x, completed } : x))
      );
    } catch (error) {
      handleError(error);
    }
  };

  const confirmDeleteItem = (itemId) => {
    setConfirmModalData({
      open: true,
      onConfirm: () => deleteItem(itemId),
      props: {
        variant: 'danger',
        title: 'Delete Item?',
        message: 'This item will be permanently deleted.',
        confirmButtonText: 'Delete',
      },
    });
  };

  /**
   * Deletes an item from the list.
   * @param {number} itemId - The item to delete from the list.
   **/
  const deleteItem = (itemId) => {
    setSelectedItemId(null);
    setItems(items.filter((x) => x.id !== itemId));
    itemApi.deleteItem(itemId).catch(handleError);
  };

  const confirmDeleteItems = (itemIds = [], props) => {
    const defaultProps = {
      variant: 'danger',
      confirmButtonText: 'Delete',
    };

    setConfirmModalData({
      open: true,
      onConfirm: async () => await deleteItems(itemIds),
      props: { ...defaultProps, ...props },
    });
  };

  // todo, can probably merge with onDeleteItem and just take array.
  const deleteItems = async (itemIds) => {
    try {
      setItems(items.filter((x) => !itemIds.includes(x.id)));
    } catch (error) {
      handleError(error);
    }
  };

  const editItem = (itemId, changes) => {
    try {
      setItems(items.map((x) => (x.id === itemId ? { ...x, ...changes } : x)));
    } catch (error) {
      handleError(error);
    }
  };

  const getSelectedItem = (itemId) => {
    return items.find((x) => x.id === itemId);
  };

  const editItems = (changes) => {
    console.log('changes', changes);
    try {
      const newItems = items.map((item) => {
        const changeForItem = changes.find((change) => change.id === item.id);

        if (!changeForItem) {
          return item;
        }

        return { ...item, ...changeForItem.changes };
      });

      setItems(newItems);
    } catch (error) {
      handleError(error);
    }
  };

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
          onItemsChange={editItems}
          onDeleteItems={(itemIds) =>
            confirmDeleteItems(itemIds, {
              title: 'Delete Completed Items?',
              message:
                'All Items marked as completed will be permanently deleted.',
            })
          }
        />

        <AddItem onAddItem={addItem} />

        {/* Header Section */}
        <div className="flex flex-1 flex-wrap items-center justify-between gap-3 mb-1 sm:mb-3">
          <div className="flex items-center gap-3">
            <Title icon={getIcon(list.iconName)} name={list.name} />
            <ActionsDropdown
              items={sortedItems}
              onSetItemsCompleted={setItemsCompleted}
              onDeleteItems={confirmDeleteItems}
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
        onDeleteItem={() => confirmDeleteItem(selectedItemId)}
        onEditItem={editItem}
      />

      <ConfirmDialog
        open={confirmModalData?.open || false}
        onDismiss={() =>
          setConfirmModalData({ ...confirmModalData, open: false })
        }
        onConfirm={async () => {
          setConfirmModalData({ ...confirmModalData, open: false });
          await confirmModalData.onConfirm();
        }}
        {...confirmModalData?.props}
      />
    </>
  );
}
