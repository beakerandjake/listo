import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { getList, setItemCompleted } from 'services/listService';
import { Skeleton } from './Skeleton';
import { AddItem } from './AddItem';
import { EmptyItemList } from './EmptyItemList';
import { EditItem } from './EditItem';
import { ItemsContainer } from './ItemsContainter';
import { ListPageHeader } from './ListPageHeader';
import { ConfirmModal } from 'components/ConfirmModal';


export function List(props) {
    const [initialized, setInitialized] = useState(false);
    const [list, setList] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [confirmModalData, setConfirmModalData] = useState({ open: false });
    const { id } = useParams();
    const handleError = useErrorHandler();

    useEffect(() => {
        let skeletonMinDisplayTimerId;

        const skeletonMinDisplayTimer = new Promise(resolve => {
            skeletonMinDisplayTimerId = setTimeout(resolve, 500);
        });

        Promise.all([getList(id), skeletonMinDisplayTimer])
            .then((values) => {
                setList(values[0]);
                setInitialized(true);
            })
            .catch(error => handleError(error));

        return () => {
            clearTimeout(skeletonMinDisplayTimerId);
            setInitialized(false);
            setList(null);
        }
    }, [id, handleError]);

    const onAddItem = async item => {
        try {
            const defaultValues = {
                id: Math.max(...list.items.map(x => x.id)) + 1,
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
            setList({ ...list, items: list.items.map(x => x.id === itemId ? { ...x, completed } : x) });
            await setItemCompleted(id, itemId, completed);
        } catch (error) {
            handleError(error);
        }
    }

    // todo, can probably merge with onSetItemComplete and just take array. 
    const setItemsCompleted = async (itemIds, completed) => {
        try {
            const updatedItems = list.items.map(x => itemIds.includes(x.id) ? { ...x, completed } : x);
            setList({ ...list, items: updatedItems });
        } catch (error) {
            handleError(error);
        }
    }

    const confirmDeleteItem = (itemId) => {
        setConfirmModalData({
            open: true,
            onConfirm: async () => await deleteItem(itemId),
            props: {
                variant: 'danger',
                title: 'Delete Item?',
                message: 'This item will be permanently deleted.',
                confirmButtonText: 'Delete'
            }
        });
    }

    const deleteItem = async (itemId) => {
        try {
            setSelectedItemId(null);
            setList({ ...list, items: list.items.filter(x => x.id !== itemId) });
            // await setItemCompleted(id, itemId, completed);
        } catch (error) {
            handleError(error);
        }
    }

    const confirmDeleteItems = (itemIds = [], props) => {
        const defaultProps = {
            variant: 'danger',
            confirmButtonText: 'Delete'
        };

        setConfirmModalData({
            open: true,
            onConfirm: async () => await deleteItems(itemIds),
            props: { ...defaultProps, ...props }
        });
    }

    // todo, can probably merge with onDeleteItem and just take array. 
    const deleteItems = async (itemIds) => {
        try {
            const updatedItems = list.items.filter(x => !itemIds.includes(x.id));
            setList({ ...list, items: updatedItems });
        } catch (error) {
            handleError(error);
        }
    }

    const editItem = (itemId, changes) => {
        try {
            setList({
                ...list, items: list.items.map(x => x.id === itemId ? { ...x, ...changes } : x)
            });
        } catch (error) {
            handleError(error);
        }
    }

    const getSelectedItem = itemId => {
        return list.items.find(x => x.id === itemId);
    }

    if (!initialized) {
        return <Skeleton />;
    }

    return (
        <>
            <ListPageHeader
                name={list.name}
                onSetItemsCompleted={setItemsCompleted}
                onDeleteItems={itemIds => confirmDeleteItems(itemIds, {
                    title: 'Delete All Items?',
                    message: 'All Items in this list will be permanently deleted.'
                })}
                items={list.items}
            />
            <div className="py-4 space-y-2">
                <AddItem onAddItem={onAddItem} />
                {list.items?.length
                    ? <ItemsContainer
                        items={list.items}
                        onSetItemCompleted={onSetItemCompleted}
                        onClickItem={setSelectedItemId}
                        onSetItemsCompleted={setItemsCompleted}
                        onDeleteItems={itemIds => confirmDeleteItems(itemIds, {
                            title: 'Delete Completed Items?',
                            message: 'All Items marked as completed will be permanently deleted.'
                        })}
                    />
                    : <EmptyItemList />
                }
            </div>
            <EditItem
                item={getSelectedItem(selectedItemId)}
                onClose={() => setSelectedItemId(null)}
                onDeleteItem={() => confirmDeleteItem(selectedItemId)}
                onEditItem={editItem}
            />
            <ConfirmModal
                open={confirmModalData?.open || false}
                onDismiss={() => setConfirmModalData({ ...confirmModalData, open: false })}
                onConfirm={async () => {
                    setConfirmModalData({ ...confirmModalData, open: false });
                    await confirmModalData.onConfirm();
                }}
                {...confirmModalData?.props}
            />
        </>
    )
}