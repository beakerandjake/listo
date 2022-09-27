import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { getList, setItemCompleted } from 'services/listService';
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
  const [initialized, setInitialized] = useState(false);
  const [list, setList] = useState(null);
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

    Promise.all([getList(id), skeletonMinDisplayTimer])
      .then((values) => {
        setList(values[0]);
        setActiveSort(defaultSorting);
        setInitialized(true);
      })
      .catch((error) => handleError(error));

    return () => {
      clearTimeout(skeletonMinDisplayTimerId);
      setInitialized(false);
      setList(null);
    };
  }, [id, handleError]);

  // whenever the list items or the active sort changes, update the sortedItems list.
  const sortedItems = useMemo(() => {
    if (!list?.items) {
      return [];
    }
    return sortItems(list.items, activeSort.itemKey, activeSort.direction);
  }, [list, activeSort]);

  const onAddItem = async (item) => {
    try {
      const defaultValues = {
        id: list.items.length
          ? Math.max(...list.items.map((x) => x.id)) + 1
          : 0,
        completed: false,
        created: new Date().toISOString(),
        note: null,
      };

      const newItem = { ...defaultValues, ...item };
      console.log('new item', newItem);
      setList({ ...list, items: [...list.items, newItem] });
    } catch (error) {
      handleError(error);
    }
  };

  const onSetItemCompleted = async (itemId, completed) => {
    try {
      setList({
        ...list,
        items: list.items.map((x) =>
          x.id === itemId ? { ...x, completed } : x
        ),
      });
      await setItemCompleted(id, itemId, completed);
    } catch (error) {
      handleError(error);
    }
  };

  // todo, can probably merge with onSetItemComplete and just take array.
  const setItemsCompleted = async (itemIds, completed) => {
    try {
      const updatedItems = list.items.map((x) =>
        itemIds.includes(x.id) ? { ...x, completed } : x
      );
      setList({ ...list, items: updatedItems });
    } catch (error) {
      handleError(error);
    }
  };

  const confirmDeleteItem = (itemId) => {
    setConfirmModalData({
      open: true,
      onConfirm: async () => await deleteItem(itemId),
      props: {
        variant: 'danger',
        title: 'Delete Item?',
        message: 'This item will be permanently deleted.',
        confirmButtonText: 'Delete',
      },
    });
  };

  const deleteItem = async (itemId) => {
    try {
      setSelectedItemId(null);
      setList({ ...list, items: list.items.filter((x) => x.id !== itemId) });
      // await setItemCompleted(id, itemId, completed);
    } catch (error) {
      handleError(error);
    }
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
      const updatedItems = list.items.filter((x) => !itemIds.includes(x.id));
      setList({ ...list, items: updatedItems });
    } catch (error) {
      handleError(error);
    }
  };

  const editItem = (itemId, changes) => {
    try {
      setList({
        ...list,
        items: list.items.map((x) =>
          x.id === itemId ? { ...x, ...changes } : x
        ),
      });
    } catch (error) {
      handleError(error);
    }
  };

  const getSelectedItem = (itemId) => {
    return list.items.find((x) => x.id === itemId);
  };

  const editItems = (changes) => {
    try {
      const newItems = list.items.map((item) => {
        const changeForItem = changes.find((change) => change.id === item.id);

        if (!changeForItem) {
          return item;
        }

        return { ...item, ...changeForItem.changes };
      });

      setList({ ...list, items: newItems });
    } catch (error) {
      handleError(error);
    }
  };

  if (!initialized) {
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

        <AddItem onAddItem={onAddItem} />

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
