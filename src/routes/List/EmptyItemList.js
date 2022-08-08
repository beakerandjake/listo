import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EmptyItemList() {
    return (
        <div className=" w-full py-5 flex flex-col justify-center items-center gap-2 select-none">
            <FontAwesomeIcon icon={faCat} size="4x" className="text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-500">List Is Empty!</h1>
            <h3 className="text-md font-semibold text-gray-400">Add some Items to get started.</h3>
        </div>
    )
}