import cx from 'classnames';

/**
 * Label to display the Items Name, will apply special styling if the item is completed.
 * @param {Object} props - The props
 * @param {string} props.name - The name of the item.
 * @param {boolean} props.completed - Has the item been marked as completed?
 * @param {string} props.className - Additional styles to apply to the element.
 */
export const ItemNameLabel = ({
    name,
    completed,
    className,
    ...props
}) => {
    return (
        <p
            {...props}
            className={cx(
                completed ? 'decoration-auto ease-in' : 'decoration-transparent ease-out',
                'transition-colors duration-75 line-through',
                className
            )}
        >
            {name}
        </p>
    )
};