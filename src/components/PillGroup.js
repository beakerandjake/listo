import cx from 'classnames';

/**
 * Pill style button which can be highlighted if active.
 * @param {Object} props
 * @param {boolean} props.active - Should this pill be highlighted?
 * @param {string} props.className - Additional styles to apply to the pill.
 * @param {React.ReactNode} props.activeItem - Which of the pills should be highlighted.
 */
export const Pill = ({
    active,
    onClick,
    className,
    children
}) => {
    return (
        <div
            className={cx(
                active
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 flex gap-2 rounded-md font-medium text-md',
                'cursor-pointer select-none keyboard-only-focus-ring flex-grow-0',
                className
            )}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={e => e.key === 'Enter' && onClick()}
        >
            {children}
        </div>
    );
};


/**
 * A group of pill style tabs which can be selected. 
 * @param {Object} props
 * @param {array} props.items - The items to create pills for.
 * @param {activeItem} props.activeItem - Which of the pills should be highlighted.
 */
export const PillGroup = ({
    children
}) => {
    return (
        <div className="flex flex-1 items-center space-x-4">
            {children}
        </div>
    );
};