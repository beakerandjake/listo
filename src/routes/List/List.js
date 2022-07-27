import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { getList } from 'services/listService';
import { PageHeader } from "components/PageHeader";
import { Skeleton } from './Skeleton';
import { AddItem } from './AddItem';
import { ItemList } from './ItemList';
import { EmptyItemList } from './EmptyItemList';
import ListActionButton from './ListActionButton';


export function List(props) {
    const [initialized, setInitialized] = useState(false);
    const [list, setList] = useState(null);
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

    const onAddItem = itemName => {
        console.log('add', itemName);
    };


    if (!initialized) {
        return <Skeleton />;
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeader name={list.name} />
                <ListActionButton />
            </div>
            <div className="py-4 space-y-4">
                <AddItem onAddItem={onAddItem} />
                {list.itemz
                    ? <ItemList items={list.items} />
                    : <EmptyItemList />
                }
            </div>
        </>
    )
}