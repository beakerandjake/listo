import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { PageHeader } from "components/PageHeader";
import { Skeleton } from './Skeleton';
import { getList } from 'services/listService';
import { AddItem } from './AddItem';


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
            <PageHeader name={list.name} />
            <div className="py-4">
                <AddItem onAddItem={onAddItem} />
                <div className="border-4 my-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}