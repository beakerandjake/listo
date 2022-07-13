import { useParams } from 'react-router-dom';
import { PageHeader } from "components/PageHeader";

export function List(props) {
    const { id } = useParams();

    return (
        <>
            <PageHeader name={'List: ' + id} />
            <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}