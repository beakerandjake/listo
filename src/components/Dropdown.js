import { Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export function DropdownMenuButton(props) {
    return (
        <Popover.Button
            className="group flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </Popover.Button>
    )
}

export function DropdownMenuNav(props) {
    return (
        <Link
            className="group flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            to={props.to}
        >
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </Link>
    )
}


export function Dropdown(props) {

    return (
        <Popover>
            <Float
                placement="bottom-end"
                offset={5}
                shift
                flip
                enter="transition duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <Popover.Button className="bg-gray-100 p-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                    <FontAwesomeIcon icon={faEllipsis} size="lg" />
                </Popover.Button>
                <Popover.Panel className="w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex flex-col overflow-hidden divide-y divide-gray-100">
                        {props.children}
                    </div>
                </Popover.Panel>
            </Float>
        </Popover>
    );
};