import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
    EllipsisMenuTrigger,
    MenuHeader,
    MenuItem,
    MenuSeparator,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent
} from "components/Menu";


/**
 * Dropdown menu which contains list wide actions.
 * @param {Object} props - The props.
 * @param {Array} props.items - The items of the list.
 * @param {function} props.onSetItemsCompleted - Callback invoked when the user wants to mark all items of the list as completed.
 * @param {function} props.onDeleteItems - Callback invoked when the user wants to delete all of the items in the list.
 */
export function ListActionsDropdown({
    items,
    onSetItemsCompleted,
    onDeleteItems
}) {
    const [open, setOpen] = useState(false);

    const markItemsCompeted = () => {
        setOpen(false);
        onSetItemsCompleted(items.filter(x => !x.completed).map(x => x.id), true);
    };

    const deleteAllItems = () => {
        setOpen(false);
        onDeleteItems(items.map(x => x.id));
    };

    return (
        <ResponsiveMenu
            open={open}
            onClose={() => setOpen(false)}
            trigger={<EllipsisMenuTrigger onClick={() => setOpen(true)} />}
        >
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>List Actions</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent>
                {items?.length > 0 && (
                    <>
                        <MenuItem
                            icon={faCheck}
                            label="Mark Items Complete"
                            disabled={items.every(x => x.completed)}
                            onClick={markItemsCompeted}
                        />
                        <MenuItem
                            icon={faTrashCan}
                            variant="danger"
                            label="Delete All Items"
                            disabled={items.length < 1}
                            onClick={deleteAllItems}
                        />
                        <MenuSeparator />
                    </>
                )}
                {/* TODO settings button */}
                {/* <DropdownMenuNav icon={faGear} label="Settings" to="edit" /> */}
            </ScrollableMenuContent>
        </ResponsiveMenu>
    );
}