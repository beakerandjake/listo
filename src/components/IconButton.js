import { forwardRef } from "react";
import cx from 'classnames';
import { Button } from "./Button";

// Styled button which just displays an icon with small amount of padding.
export const IconButton = forwardRef((props, ref) => {
    const { className, ...rest } = props;

    return (
        <Button
            {...rest}
            ref={ref}
            className={cx(
                'bg-inherit shadow-none text-gray-500 enabled:hover:text-gray-700 enabled:hover:bg-inherit text-base p-1',
                className
            )}
            border="none"
            size="custom"
        />
    )
});