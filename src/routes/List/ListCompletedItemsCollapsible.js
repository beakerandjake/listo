import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Disclosure } from "@headlessui/react";
import cx from "classnames";
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
import {
    PopIn,
    SwitchTransition,
    Transition
} from "components/Transition";

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
 * @param {function} props.onSetItemsIncomplete - Callback invoked when the user wants to mark all of the completed items as incomplete.
 * @param {function} props.onDeleteAllItems - Callback invoked when the user wants to delete all of the completed items
 * @param {React.ReactNode=} props.children - The completed items to render.
 */
export function ListCompletedItemsCollapsible({
    onSetItemsIncomplete,
    onDeleteAllItems,
    children
}) {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    {/* Trigger / Menu */}
                    <div className="w-full flex items-center justify-between gap-2 cursor-pointer select-none">
                        {/* Trigger */}
                        <Disclosure.Button className="py-5 flex items-center flex-1 gap-2 group focus:outline-none focus-visible:outline-none">
                            {/* Toggle Icon */}
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={cx({ 'rotate-90': open }, "transition-transform rounded group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-indigo-500")}
                                fixedWidth
                            />
                            <h3 className="text-md leading-6 font-medium text-gray-700">
                                <span className="pr-2">Completed</span>
                                {/* Count Badge */}
                                <SwitchTransition switchKey={children.length} as={PopIn}>
                                    <Badge size="lg" variant="success">
                                        {children.length}
                                    </Badge>
                                </SwitchTransition>
                            </h3>
                        </Disclosure.Button>
                        {/* Menu */}
                        <div className="flex-grow-0 flex items-center">
                            <CompletedItemsActionsMenu
                                onSetItemsIncomplete={onSetItemsIncomplete}
                                onDeleteAllItems={onDeleteAllItems}
                            />
                        </div>
                    </div>

                    {/* Divider, shown while closed. */}
                    <Transition
                        in={!open}
                        unmountOnExit
                        classNames={{
                            enter: 'opacity-0',
                            enterActive: 'transition-opacity ease-in duration-300 !opacity-100',
                            exit: 'opacity-100',
                            exitActive: 'transition-opacity ease-out !opacity-0',
                        }}
                    >
                        <div className="w-full border-t border-gray-300" />
                    </Transition>

                    {/* Items */}
                    <div className="overflow-hidden py-1">
                        <Transition
                            in={open}
                            unmountOnExit
                            classNames={{
                                enter: '-translate-y-full opacity-0',
                                enterActive: 'transition-[transform,opacity] ease-out duration-300 !translate-y-0 !opacity-100',
                                exit: 'opacity-100 translate-y-0',
                                exitActive: 'transition-[transform,opacity] ease-out duration-300 !opacity-0 !-translate-y-full'
                            }}
                        >
                            <Disclosure.Panel static className="flex flex-col gap-2">
                                {children}
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                </>
            )}
        </Disclosure>
    );
};