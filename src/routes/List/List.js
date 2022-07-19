import { useParams } from 'react-router-dom';
import { PageHeader } from "components/PageHeader";
import { useEffect, useState } from 'react';
import { Skeleton } from './Skeleton';
import { getList } from 'services/listService';
import { AddItem } from './AddItem';

export function List(props) {
    const { id } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [list, setList] = useState(null);

    useEffect(() => {
        let skeletonMinDisplayTimerId;

        const skeletonMinDisplayTimer = new Promise(resolve => {
            skeletonMinDisplayTimerId = setTimeout(resolve, 500);
        });

        Promise.all([getList(id), skeletonMinDisplayTimer])
            .then((values) => {
                setList(values[0]);
                setInitialized(true);
            });

        return () => {
            clearTimeout(skeletonMinDisplayTimerId);
            setInitialized(false);
            setList(null);
        }
    }, [id]);



    if (!initialized) {
        return <Skeleton />;
    }

    return (
        <>
            <PageHeader name={list.name} />
            <div className="py-4">
                <AddItem />
                <div className="border-4 my-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}