import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Transition, Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { usePreviousValue } from "hooks/usePreviousValue";
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


/**
 * A collapsible container which renders items as children.
 * @param {Object} props - The props.
 * @param {Array} props.count - The number of completed items in the container, controls whether this component is rendered or not.
 * @param {function} props.onSetAllItemsCompleted - Callback invoked when the user wants to mark all of the completed items as incomplete.
 * @param {function} props.onDeleteAllItems - Callback invoked when the user wants to delete all of the completed items
 * @param {React.ReactNode=} props.children - The completed items to render.
 */
export function CompletedItemsContainer({
    count,
    onSetAllItemsCompleted,
    onDeleteAllItems,
    children
}) {
    /**
     * Cache the previous count value, this resolves an issue when the count becomes zero
     * the fade out animation will start, and the count badge will briefly change to zero.
     * to prevent this display the previous value instead of the current value whenever the current
     * value becomes zero 
     **/
    const previousCount = usePreviousValue(count);
    const [open, setOpen] = useState(false);

    // Reset our open state any time the count becomes zero. 
    useEffect(() => {
        if (count <= 0) {
            setOpen(false);
        }
    }, [count]);

    return (
        <Transition
            appear={false}
            show={count > 0}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-75"
            leaveTo="opacity-0 scale-95"
        >
            <Disclosure>
                {({ open }) => (
                    <>
                        <div
                            className={classNames({ "border-b border-gray-200": !open },
                                "mt-2 w-full flex items-center justify-between gap-2 cursor-pointer select-none "
                            )}
                        >
                            <Disclosure.Button className="py-5 flex items-center flex-1 gap-2 group focus:outline-none focus-visible:outline-none">
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className={classNames({ 'rotate-90': open }, "transition-transform rounded group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-indigo-500")}
                                    fixedWidth
                                />
                                <h3 className="text-md leading-6 font-medium text-gray-700">
                                    <span className="pr-2">Completed</span>
                                    <Badge content={count || previousCount} size="lg" variant="success" />
                                </h3>
                            </Disclosure.Button>
                            <div className="flex-grow-0 flex items-center">
                                <CompletedItemsDropdown
                                    onSetAllItemsCompleted={onSetAllItemsCompleted}
                                    onDeleteAllItems={onDeleteAllItems}
                                />
                            </div>
                        </div>
                        <Transition
                            enter="transition-all duration-300 ease-out"
                            enterFrom="transform -translate-y-1/4 opacity-0"
                            enterTo="transform translate-y-100 opacity-100"
                            leave="transition duration-150 ease-out"
                            leaveFrom="transform opacity-100"
                            leaveTo="transform opacity-0"
                        >
                            <Disclosure.Panel>
                                {children}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </Transition>
    )
}