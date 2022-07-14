import { useParams } from 'react-router-dom';
import { PageHeader } from "components/PageHeader";
import { useState } from 'react';
import { Skeleton } from './Skeleton';

export function List(props) {
    const { id } = useParams();
    const { loading, setLoading } = useState(true);

    return (
        <>
            <Skeleton />
            {/* <PageHeader name={'List: ' + id} />
            <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div> */}
        </>
    )
}