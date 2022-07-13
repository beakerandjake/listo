import { PageHeader } from "components/PageHeader";

export function Dashboard(props) {
    return (
        <>
            <PageHeader name="Dashboard" />
            <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}