import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { PageHeader } from "components/PageHeader";
import { getIcon } from "services/iconLibrary";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuNav,
    DropdownMenuSeparator,
    EllipsisDropdownMenuTrigger,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { SortingDropdown } from "./SortingDropdown";


export function ListPageHeader(props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {!!props.iconName && <FontAwesomeIcon icon={getIcon(props.iconName)} size="xl" className="text-gray-500 hidden sm:block" />}
                <PageHeader name={props.name} />
                <DropdownMenu modal={false}>
                    <EllipsisDropdownMenuTrigger />
                    <DropdownMenuContent loop={true} align="start">
                        <DropdownMenuHeading title="List Actions" />
                        <DropdownMenuItem
                            icon={faCheck}
                            text="Mark Items Complete"
                            disabled={props.items.every(x => x.completed)}
                            onClick={() => props.onSetItemsCompleted(props.items.filter(x => !x.completed).map(x => x.id), true)}
                        />
                        <DropdownMenuItem
                            icon={faTrashCan}
                            variant="danger"
                            text="Delete All Items"
                            disabled={props.items.length < 1}
                            onClick={() => props.onDeleteItems(props.items.map(x => x.id))}
                        />
                        <DropdownMenuSeparator />
                        <DropdownMenuNav icon={faGear} text="Settings" to="edit" />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {!!props.items?.length && (
                <div className="flex-grow-0 flex items-center">
                    <SortingDropdown onChooseSort={props.onChooseSort} activeSort={props.activeSort} />
                </div>
            )}
        </div>
    )
}