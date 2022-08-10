import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuNav,
    DropdownMenuSeparator,
    EllipsisDropdownMenuTrigger,
    DropdownMenuHeading
} from 'components/DropdownMenu';


export function ListActionsDropdown(props) {
    return (
        <DropdownMenu modal={false}>
            <EllipsisDropdownMenuTrigger />
            <DropdownMenuContent loop={true} align="start">
                <DropdownMenuHeading title="List Actions" />
                {props.items?.length > 0 && (
                    <>
                        <DropdownMenuItem
                            icon={faCheck}
                            label="Mark Items Complete"
                            disabled={props.items.every(x => x.completed)}
                            onClick={() => props.onSetItemsCompleted(props.items.filter(x => !x.completed).map(x => x.id), true)}
                        />
                        <DropdownMenuItem
                            icon={faTrashCan}
                            variant="danger"
                            label="Delete All Items"
                            disabled={props.items.length < 1}
                            onClick={() => props.onDeleteItems(props.items.map(x => x.id))}
                        />
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuNav icon={faGear} label="Settings" to="edit" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}