import { PageHeader } from "components/PageHeader";

export function NotFound() {
    return (
        <>
            <PageHeader name="Not Found" />
            <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </>
    )
}