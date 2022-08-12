import cx from 'classnames';

/**
 * Styled Title for a Menu.
 * @param {Object} props
 * @param {string} props.title - The title to display.
 * @param {string} props.className - Additional styles to apply to the title. 
 */
export function MenuTitle({ title, className }) {
    return (
        <div className={cx('text-md font-semibold text-gray-500 select-none truncate', className)}>
            {title}
        </div>
    )
}