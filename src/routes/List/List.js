import { useParams } from 'react-router-dom';
import { PageHeader } from "components/PageHeader";
import { useEffect, useState } from 'react';
import { Skeleton } from './Skeleton';
import { getList } from 'services/listService';

export function List(props) {
    const { id } = useParams();
    const [initialized, setInitialized] = useState(false);
    const [list, setList] = useState(null);

    useEffect(() => {
        let skeletonMinDisplayTimerId;

        const skeletonMinDisplayTimer = new Promise(resolve => {
            skeletonMinDisplayTimerId = setTimeout(resolve, 500);
        });

        getList(id)
            .then(list => setList(list))
            .then(() => skeletonMinDisplayTimer)
            .then(() => setInitialized(true));

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
            <PageHeader name={'List: ' + id} />
            <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}