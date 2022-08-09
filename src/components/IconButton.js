import { forwardRef } from "react";
import { Button } from "./Button";

export const IconButton = forwardRef((props, ref) => {
    const { className, ...rest } = props;

    return (
        <Button
            {...rest}
            ref={ref}
            className="bg-inherit shadow-none text-gray-500 enabled:hover:text-gray-700 enabled:hover:bg-inherit text-base p-1"
            border="none"
            size="custom"
        />
    )
});