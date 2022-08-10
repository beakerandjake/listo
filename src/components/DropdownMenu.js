import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import classNames from 'classnames';

export const DropdownMenuPortal = RadixDropdownMenu.Portal;
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

const CONTENT_VARIANTS = {
    icon: {
        danger: 'text-red-600 group-enabled:group-hover:text-red-700',
        success: 'text-green-700 group-hover:text-green-800',
        default: 'text-gray-400 group-hover:text-gray-500'
    },
    label: {
        danger: 'text-red-600',
        success: 'text-green-700',
        default: 'text-inherit'
    }
};

const ItemIcon = ({ icon, variant }) => {
    if (!icon) {
        return null;
    }

    return (
        <FontAwesomeIcon
            icon={icon}
            className={CONTENT_VARIANTS.icon[variant] || CONTENT_VARIANTS.icon.default}
            fixedWidth
        />
    )
};

const ItemLabel = ({ text, variant }) => {
    if (!text) {
        return null;
    }

    return (
        <span className={cx("text-sm flex-1", CONTENT_VARIANTS.label[variant] || CONTENT_VARIANTS.label.default)}>
            {text}
        </span>
    )
}

const DEFAULT_ITEM_STYLE = classNames(
    "group flex items-center w-full gap-1 p-2 cursor-pointer select-none",
    "focus:outline-none radix-disabled:pointer-events-none radix-disabled:opacity-50",
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    "focus-visible:bg-gray-100 focus-visible:text-gray-900",
);

export function DropdownMenuItem(props) {
    const { onClick, className, children, label, icon, variant, ...rest } = props;

    return (
        <RadixDropdownMenu.Item
            {...rest}
            onSelect={onClick}
            className={cx(DEFAULT_ITEM_STYLE, className)}
        >
            <ItemIcon icon={icon} variant={variant} />
            <ItemLabel text={label} variant={variant} />
            {props.children}
        </RadixDropdownMenu.Item>
    )
}


export function DropdownMenuNav(props) {
    if (props.disabled) {
        return (
            <DropdownMenuItem {...props} />
        )
    }

    const { variant, icon, label, className, to, ...rest } = props;

    return (
        <RadixDropdownMenu.Item asChild {...rest}>
            <Link to={props.to} className={cx(DEFAULT_ITEM_STYLE, className)}>
                <ItemIcon icon={icon} variant={variant} />
                <ItemLabel text={label} variant={variant} />
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

export function DropdownMenuSubTrigger(props) {
    const { icon, label, variant, children, className, ...rest } = props;

    return (
        <RadixDropdownMenu.SubTrigger {...rest} className={cx(DEFAULT_ITEM_STYLE, className)}>
            <ItemIcon icon={icon} variant={variant} />
            <ItemLabel text={label} variant={variant} />
            {children}
        </RadixDropdownMenu.SubTrigger>
    )
}

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