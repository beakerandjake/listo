import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export function DropdownMenuItem(props) {
    return (
        <RadixDropdownMenu.Item
            disabled={props.disabled}
            onSelect={props.onClick}
            className="group flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50"
        >
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuNav(props) {
    const content = (
        <div className="p-2 flex items-center gap-1">
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </div>
    );

    const contentWrapper = props.disabled
        ? <span>{content}</span>
        : <Link to={props.to}>{content}</Link>

    return (
        <RadixDropdownMenu.Item
            disabled={props.disabled}
            className=" text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50"
        >
            {contentWrapper}
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuSeparator(props) {
    return <RadixDropdownMenu.Separator className="border-t border-gray-100 my-1" />
}

export function DropdownMenuContent(props) {
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                side="bottom"
                align="end"
                sideOffset={5}
                className="py-1 flex flex-col w-56 rounded-md shadow-lg bg-white ring-1 ring-gray-200 focus:outline-none"
            >
                {props.children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    );
}

export function EllipsisDropdownMenuTrigger(props) {
    return (
        <DropdownMenuTrigger className="bg-gray-100 p-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
            <FontAwesomeIcon icon={faEllipsisH} size="lg" />
        </DropdownMenuTrigger>
    )
}
