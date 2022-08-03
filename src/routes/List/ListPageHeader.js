import { faCheck, faGear, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownDivider, DropdownMenuButton, DropdownMenuNav } from "components/Dropdown";
import { PageHeader } from "components/PageHeader";

export function ListPageHeader(props) {

    const dropdownActions = (
        <>
            <div className="py-1">
                <DropdownMenuButton icon={faCheck} text="Mark Items Complete" onClick={props.onSetAllItemsCompleted} key="complete" />
                <DropdownMenuButton icon={faTrashAlt} text="Delete All Items" onClick={props.onDeleteAllItems} key="delete" />
            </div>
            <div className="py-1">
                <DropdownMenuNav icon={faGear} text="Settings" to="edit" key="settings" />
            </div>
        </>
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
                <PageHeader name={props.name} />
            </div>
            <div className="flex-grow-0 flex items-center">
                <Dropdown>
                    {dropdownActions}
                </Dropdown>
            </div>
        </div>
    )
}