import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';


export const DropdownMenuPortal = RadixDropdownMenu.Portal;
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export function DropdownMenuItem(props) {
    return (
        <RadixDropdownMenu.Item
            disabled={props.disabled}
            onSelect={props.onClick}
            className="group flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50"
        >
            {props.children}
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuButton(props) {
    const { icon, text, ...rest } = props;
    return (
        <DropdownMenuItem {...rest}>
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </DropdownMenuItem>
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
            className=" text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
            {contentWrapper}
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuHeading(props) {
    return (
        <div className="-my-1">
            <div className={cx("rounded-md py-2 -mb-1 flex items-center justify-center font-medium text-md bg-gray-50", props.className)}>
                {props.title}
            </div>
            <DropdownMenuSeparator />
        </div>

    )
}

export function DropdownMenuSeparator(props) {
    return <RadixDropdownMenu.Separator className="border-t border-gray-100 my-1" />
}

export function DropdownMenuContent(props) {
    const { children, ...rest } = props;
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content 
                side={"bottom"}
                align={"end"}
                sideOffset={5}
                className="py-1 flex flex-col w-56 rounded-md shadow-lg bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none"
                {...rest}
            >
                {props.children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    );
}

export function EllipsisDropdownMenuTrigger(props) {
    return (
        <DropdownMenuTrigger className={cx("bg-gray-100 h-5 w-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500", props.className)}>
            <FontAwesomeIcon icon={faEllipsisH} size="lg" />
        </DropdownMenuTrigger>
    )
}

export const DropdownMenuSub = RadixDropdownMenu.Sub;
export const DropdownMenuSubTrigger = RadixDropdownMenu.SubTrigger;

export function DropdownMenuSubContent(props) {
    const { children, className, ...rest } = props;
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.SubContent
                className={cx("py-1 flex flex-col min-w-56 rounded-md shadow-lg bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none", className)}
                {...rest}
            >
                {children}
            </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Portal>
    );
}