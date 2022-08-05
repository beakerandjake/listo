import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { PageHeader } from "components/PageHeader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuNav,
    DropdownMenuSeparator,
    EllipsisDropdownMenuTrigger
} from 'components/DropdownMenu';

export function ListPageHeader(props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
                <PageHeader name={props.name} />
            </div>
            <div className="flex-grow-0 flex items-center">
                <DropdownMenu modal={false}>
                    <EllipsisDropdownMenuTrigger />
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            icon={faCheck}
                            text="Mark Items Complete"
                            disabled={props.items.every(x => x.completed)}
                            onClick={() => props.onSetItemsCompleted(props.items.filter(x => !x.completed).map(x => x.id), true)}
                        />
                        <DropdownMenuItem
                            icon={faTrashCan}
                            text="Delete All Items"
                            disabled={props.items.length < 1}
                            onClick={() => props.onDeleteItems(props.items.map(x => x.id))}
                        />
                        <DropdownMenuSeparator />
                        <DropdownMenuNav icon={faGear} text="Settings" to="edit" />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}