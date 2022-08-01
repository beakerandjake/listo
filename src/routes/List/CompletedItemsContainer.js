import { Disclosure, Transition } from "@headlessui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Badge } from "components/Badge";
import { Fragment } from "react";

export function CompletedItemsContainer(props) {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        as="div"
                        className={classNames({ "border-b border-gray-200": !open },
                            "pt-5 pb-5 flex items-center gap-2 cursor-pointer select-none"
                        )}
                    >
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