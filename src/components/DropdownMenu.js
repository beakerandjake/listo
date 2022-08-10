import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';


export const DropdownMenuPortal = RadixDropdownMenu.Portal;
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

const CONTENT_VARIANTS = {
    icon: {
        danger: 'text-red-600 group-hover:text-red-700',
        success: 'text-green-700 group-hover:text-green-800',
        default: 'text-gray-400 group-hover:text-gray-500'
    },
    label: {
        danger: 'text-red-600',
        success: 'text-green-700',
        default: 'text-inherit'
    }

};

// Helper container for consistent styling of Menu Items. 
// Must be wrapped in a DropdownMenuItem or DropdownMenuItemNav
export function DropdownMenuItemContent(props) {
    const { icon, text, variant, className, ...rest } = props;

    return (
        <div
            {...rest}
            className={cx(
                "group flex items-center w-full gap-1 p-2 cursor-pointer select-none",
                "focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50",
                "text-gray-700 group-hover:bg-gray-100 group-hover:text-gray-900  group-focus-visible:bg-gray-100  group-focus-visible:text-gray-900",
                className
            )}
        >
            {!!icon && (
                <FontAwesomeIcon
                    icon={props.icon}
                    className={CONTENT_VARIANTS.icon[variant] || CONTENT_VARIANTS.icon.default}
                    fixedWidth
                />
            )}
            {!!text && (
                <span className={cx("text-sm flex-1", CONTENT_VARIANTS.label[variant] || CONTENT_VARIANTS.label.default)}>
                    {props.text}
                </span>
            )}
            {props.children}
        </div>
    );
}

export function DropdownMenuItem(props) {
    const { onClick, children, ...rest } = props;
    return (
        <RadixDropdownMenu.Item onSelect={props.onClick} className="group focus:outline-none">
            <DropdownMenuItemContent {...rest}>
                {children}
            </DropdownMenuItemContent>
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuNav(props) {
    if (props.disabled) {
        return (
            <DropdownMenuItem {...props} />
        )
    }

    return (
        <RadixDropdownMenu.Item asChild className="group focus:outline-none">
            <Link to={props.to}>
                <DropdownMenuItemContent {...props} />
            </Link>
        </RadixDropdownMenu.Item>
    )
}

export function DropdownMenuHeading(props) {
    return (
        <div className="-my-1">
            <div className={cx("rounded-t-md mb-2 py-2 flex items-center justify-center font-medium text-sm bg-gray-50 border-b text-gray-700 border-gray-300 select-none", props.className)}>
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
                collisionBoundary={10}
                className="py-1 flex flex-col w-56 rounded-md shadow-lg bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none z-[3]"
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
                className={cx("py-1 z-[3] flex flex-col min-w-[14rem] rounded-md shadow-lg bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none", className)}
                {...rest}
            >
                {children}
            </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Portal>
    );
}