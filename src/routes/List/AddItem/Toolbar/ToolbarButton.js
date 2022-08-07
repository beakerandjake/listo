import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';
import * as RadixToolbar from '@radix-ui/react-toolbar';

export const ToolbarButton = forwardRef((props, ref) => {
    const { icon, text, className, ...rest } = props;

    return (
        <RadixToolbar.Button asChild>
            <button
                {...rest}
                ref={ref}
                className={cx(
                    'p-1 flex items-center justify-between gap-1 leading-0',
                    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                    'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500',
                    'rounded shadow-sm border border-gray-300 bg-white enabled:hover:bg-gray-50 text-gray-700',
                    className
                )}>
                <FontAwesomeIcon icon={icon} fixedWidth />
                {text && <span className="text-sm">{text}</span>}
            </button>
        </RadixToolbar.Button>
    )
});