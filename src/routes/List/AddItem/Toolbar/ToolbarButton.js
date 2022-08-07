import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';

export const ToolbarButton = forwardRef((props, ref) => {
    const { icon, className, ...rest } = props;

    return (
        <button
            {...rest}
            ref={ref}
            className={cx(
                "rounded p-1 cursor-pointer flex items-center space-between gap-1 leading-0",
                "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500",
                "text-gray-500 hover:text-gray-900 hover:bg-zinc-100",
                className
            )}
        >
            <FontAwesomeIcon icon={props.icon} fixedWidth />
            <span className="text-sm">Overdue, Sun, Jul 31</span>
        </button>
    )
});