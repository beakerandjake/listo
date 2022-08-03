import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { getList, setItemCompleted } from 'services/listService';
import { PageHeader } from "components/PageHeader";
import { Skeleton } from './Skeleton';
import { AddItem } from './AddItem';
import { EmptyItemList } from './EmptyItemList';
import ListActionButton from './ListActionButton';
import { EditItem } from './EditItem/EditItem';
import { ItemsContainer } from './ItemsContainter';
import { ListPageHeader } from './ListPageHeader';


export function List(props) {
    const [initialized, setInitialized] = useState(false);
    const [list, setList] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
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

    const onAddItem = async itemName => {
        try {
            const newItem = {
                id: Math.max(...list.items.map(x => x.id)) + 1,
                name: itemName,
                quantity: 1,
                completed: false
            };
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

    const onDeleteItem = async (itemId) => {
        try {
            console.log('on delete item', itemId);
            setSelectedItemId(null);
            setList({ ...list, items: list.items.filter(x => x.id !== itemId) });
            // await setItemCompleted(id, itemId, completed);
        } catch (error) {
            handleError(error);
        }
    }

    // todo, can probably merge with onSetItemComplete and just take array. 
    const onSetItemsCompleted = async (itemIds, completed) => {
        try {
            const updatedItems = list.items.map(x => itemIds.includes(x.id) ? { ...x, completed } : x);
            setList({ ...list, items: updatedItems });
        } catch (error) {
            handleError(error);
        }
    }

    // todo, can probably merge with onDeleteItem and just take array. 
    const onDeleteItems = async (itemIds) => {
        try {
            const updatedItems = list.items.filter(x => !itemIds.includes(x.id));
            setList({ ...list, items: updatedItems });
        } catch (error) {
            handleError(error);
        }
    }

    const onEditItem = (itemId, changes) => {
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
            {/* <div className="flex justify-between items-center">
                <PageHeader name={list.name} />
                <ListActionButton />
            </div> */}
            <ListPageHeader name={list.name} />
            <div className="py-4 space-y-2">
                <AddItem onAddItem={onAddItem} />
                {list.items?.length
                    ? <ItemsContainer
                        items={list.items}
                        onSetItemCompleted={onSetItemCompleted}
                        onClickItem={setSelectedItemId}
                        onSetItemsCompleted={onSetItemsCompleted}
                        onDeleteItems={onDeleteItems}
                    />
                    : <EmptyItemList />
                }
            </div>
            <EditItem
                item={getSelectedItem(selectedItemId)}
                onClose={() => setSelectedItemId(null)}
                onDeleteItem={() => onDeleteItem(selectedItemId)}
                onEditItem={onEditItem} />
        </>
    )
}