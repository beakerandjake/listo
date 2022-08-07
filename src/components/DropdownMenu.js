import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';


export const DropdownMenuPortal = RadixDropdownMenu.Portal;
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export function DropdownMenuItem(props) {
    const { className, onClick, children, ...rest } = props;
    return (
        <RadixDropdownMenu.Item
            onSelect={props.onClick}
            className={cx(
                "group flex items-center w-full gap-1 p-2 cursor-pointer",
                "focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50",
                "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:bg-gray-100 focus-visible:text-gray-900",
                className
            )}
            {...rest}
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
        <>
            <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth />
            <p className="text-sm">{props.text}</p>
        </>
    );


    if (props.disabled) {
        return (
            <DropdownMenuItem {...props}>
                {content}
            </DropdownMenuItem>
        )
    }

    return (
        <DropdownMenuItem asChild disabled={props.disabled}>
            <Link to={props.to}>
                {content}
            </Link>
        </DropdownMenuItem>
    )
}

export function DropdownMenuHeading(props) {
    return (
        <div className="-my-1">
            <div className={cx("rounded-t-md mb-2 py-2 flex items-center justify-center font-medium text-md bg-gray-50 border-b border-gray-300", props.className)}>
                {props.title}
            </div>
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