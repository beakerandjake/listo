import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { usePreviousValue } from "hooks/usePreviousValue";
import { Transition } from "components/Transition";
import { Badge } from "components/Badge";
import {
    EllipsisMenuTrigger,
    MenuHeader,
    MenuItem,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent,
    StatefulMenu
} from "components/Menu";

/**
 * Menu which contains actions which apply to all of the items in the completed container.
 * @param {Object} props - The props.
 * @param {Array} props.items - The items of the list.
 * @param {function} props.onSetItemsIncomplete - Callback invoked when the user wants to mark all of the completed items as incomplete.
 * @param {function} props.onDeleteAllItems - Callback invoked when the user wants to delete all of the completed items
 */
const CompletedItemsActionsMenu = ({ onSetItemsIncomplete, onDeleteAllItems }) => {
    return (
        <StatefulMenu>
            {({ open, setOpen }) => (
                <ResponsiveMenu
                    open={open}
                    onClose={() => setOpen(false)}
                    trigger={<EllipsisMenuTrigger onClick={() => setOpen(true)} />}
                    desktopPlacement='bottom-end'
                >
                    <MenuHeader className="flex items-center justify-center">
                        <MenuTitle>List Actions</MenuTitle>
                    </MenuHeader>
                    <ScrollableMenuContent>
                        <MenuItem
                            icon={faRotateLeft}
                            label="Mark Items Incomplete"
                            onClick={() => {
                                setOpen(false);
                                onSetItemsIncomplete();
                            }}
                        />
                        <MenuItem
                            icon={faTrashCan}
                            variant="danger"
                            label="Delete Completed Items"
                            onClick={() => {
                                setOpen(false);
                                onDeleteAllItems();
                            }}
                        />
                    </ScrollableMenuContent>
                </ResponsiveMenu >
            )}
        </StatefulMenu>
    )
};


/**
 * A collapsible container which renders items as children.
 * @param {Object} props - The props.
 * @param {Array} props.count - The number of completed items in the container, controls whether this component is rendered or not.
 * @param {function} props.onSetItemsIncomplete - Callback invoked when the user wants to mark all of the completed items as incomplete.
 * @param {function} props.onDeleteAllItems - Callback invoked when the user wants to delete all of the completed items
 * @param {React.ReactNode=} props.children - The completed items to render.
 */
export function ListCompletedItemsCollapsible({
    count,
    onSetItemsIncomplete,
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

    return (
        <Transition
            in={count > 0}
            unmountOnExit
            enter="opacity-0 scale-95"
            enterActive="transition-all ease-out duration-300 !opacity-100 !scale-100"
            exit="opacity-100 scale-100"
            exitActive="transition-all ease-in duration-100 !opacity-0 !scale-95"
        >
            <div>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div
                                className={classNames(
                                    { "border-b border-gray-300": !open },
                                    'mt-2 w-full flex items-center justify-between gap-2 cursor-pointer select-none transition-all'
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
                                        <Badge size="lg" variant="success">
                                            {count || previousCount}
                                        </Badge>
                                    </h3>
                                </Disclosure.Button>
                                <div className="flex-grow-0 flex items-center">
                                    <CompletedItemsActionsMenu
                                        onSetItemsIncomplete={onSetItemsIncomplete}
                                        onDeleteAllItems={onDeleteAllItems}
                                    />
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <Transition
                                    in={open}
                                    unmountOnExit
                                    enter="-translate-y-full opacity-0"
                                    enterActive="transition-all ease-out duration-300 !translate-y-0 !opacity-100"
                                    exit="opacity-100 translate-y-0"
                                    exitActive="transition-all ease-out duration-300 !opacity-0 !-translate-y-full"
                                >
                                    <Disclosure.Panel static>
                                        {children}
                                    </Disclosure.Panel>
                                </Transition>
                            </div>
                        </>
                    )}
                </Disclosure>
            </div>
        </Transition>
    )
}