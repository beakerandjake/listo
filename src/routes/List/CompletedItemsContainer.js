import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from "classnames";
import * as Collapsible from '@radix-ui/react-collapsible';
import { Transition } from "@headlessui/react";
import { Badge } from "components/Badge";
import {
    EllipsisMenuTrigger,
    MenuHeader,
    MenuItem,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent
} from "components/Menu";

/**
 * Dropdown menu which contains actions which apply to all of the items in the completed container.
 * @param {Object} props - The props.
 * @param {Array} props.items - The items of the list.
 * @param {function} props.onSetAllItemsCompleted - Callback invoked when the user wants to mark all of the completed items as incomplete.
 * @param {function} props.onDeleteAllItems - Callback invoked when the user wants to delete all of the completed items
 */
const CompletedItemsDropdown = ({ onSetAllItemsCompleted, onDeleteAllItems }) => {
    const [open, setOpen] = useState(false);

    const closeDropdownThen = fn => {
        setOpen(false);
        fn();
    }

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
                <MenuItem icon={faRotateLeft} label="Mark Items Incomplete" onClick={() => closeDropdownThen(onSetAllItemsCompleted)} />
                <MenuItem icon={faTrashCan} variant="danger" label="Delete Completed Items" onClick={() => closeDropdownThen(onDeleteAllItems)} />
            </ScrollableMenuContent>
        </ResponsiveMenu >
    )
};

export function CompletedItemsContainer(props) {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <div
                className={classNames({ "border-b border-gray-200": !open },
                    "mt-2 w-full flex items-center justify-between gap-2 cursor-pointer select-none "
                )}
            >
                <Collapsible.Trigger className="py-5 flex items-center flex-1 gap-2 group focus:outline-none focus-visible:outline-none">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={classNames({ 'rotate-90': open }, "transition-transform rounded group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-indigo-500")}
                        fixedWidth
                    />
                    <h3 className="text-md leading-6 font-medium text-gray-700">
                        <span className="pr-2">Completed</span>
                        <Badge content={props.count} size="lg" variant="success" />
                    </h3>
                </Collapsible.Trigger>
                <div className="flex-grow-0 flex items-center">
                    <CompletedItemsDropdown
                        onSetAllItemsCompleted={props.onSetAllItemsCompleted}
                        onDeleteAllItems={props.onDeleteAllItems}
                    />
                </div>
            </div>
            <Collapsible.Content>
                {props.children}
            </Collapsible.Content>
        </Collapsible.Root>
    )
}