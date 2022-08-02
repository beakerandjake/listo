import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRotateLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Badge } from "components/Badge";
import { Dropdown, DropdownMenuItem } from "components/Dropdown";

export function CompletedItemsContainer(props) {

    const onMarkAllIncomplete = () => {
        console.log('mark all incomplete');
    }

    const onDeleteAll = () => {
        console.log('delete all completed');
    }

    const dropdownActions = [
        <DropdownMenuItem icon={faRotateLeft} text="Mark Items Incomplete" onClick={onMarkAllIncomplete} />,
        <DropdownMenuItem icon={faTrashAlt} text="Delete Completed Items" onClick={onDeleteAll} />
    ]

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div
                        className={classNames({ "border-b border-gray-200": !open },
                            "pt-5 pb-5 flex items-center justify-between cursor-pointer select-none"
                        )}
                    >
                        <Disclosure.Button as="div" className="flex items-center flex-1 gap-2">
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={classNames({ 'rotate-90': open }, "transition-transform")}
                                fixedWidth
                            />
                            <h3 className="text-md leading-6 font-medium text-gray-700">
                                <span className="pr-2">Completed</span>
                                <Badge content={props.count} size="lg" variant="success" />
                            </h3>
                        </Disclosure.Button>
                        <div className="flex-grow-0 flex items-center">
                            <Dropdown>
                                {dropdownActions}
                            </Dropdown>
                        </div>
                    </div>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform -translate-y-1 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform -translate-y-1 opacity-0"
                    >
                        <Disclosure.Panel as={Fragment}>
                            {props.children}
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}