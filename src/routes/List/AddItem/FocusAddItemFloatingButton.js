import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FloatingActionButton } from "components/FloatingActionButton";


export const FocusAddItemFloatingButton = ({
    addItemRef
}) => {

    return (
        <FloatingActionButton icon={faPlus} className="text-white bg-green-700" />
    );
};