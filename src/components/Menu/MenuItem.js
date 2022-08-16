import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const VARIANT_STYLES = {
    icon: {
        danger: 'text-red-600 group-hover:text-red-700',
        success: 'text-green-700 group-hover:text-green-800',
        default: 'text-gray-400 group-hover:text-gray-500'
    },
    label: {
        danger: 'text-red-600',
        success: 'text-green-700',
        default: 'text-gray-700'
    }
};

const RESPONSIVE_TEXT_STYLES = 'text-xl sm:text-lg md:text-md lg:text-sm';

const MenuItemIcon = ({ icon, variant }) => {
    if (!icon) {
        return null;
    }

    const variantStyle = VARIANT_STYLES.icon[variant] || VARIANT_STYLES.icon.default;

    return (
        <FontAwesomeIcon
            icon={icon}
            className={cx(variantStyle, RESPONSIVE_TEXT_STYLES)}
            fixedWidth
        />
    )
};

/**
 * Wrapper which applies consistent styles to labels in a Menu Item.
 * @param {Object} props
 * @param {string} props.children - The contents of the label.
 * @param {string} props.variant - Variant styling to apply to the text. 
 * @param {string} props.className - Additional styles to apply to the label. 
 */
export function MenuItemLabel({ children, variant, className }) {
    if (!children) {
        return null;
    }

    return (
        <span
            className={cx(
                RESPONSIVE_TEXT_STYLES,
                VARIANT_STYLES.label[variant] || VARIANT_STYLES.label.default,
                className
            )}
        >
            {children}
        </span>
    )
}

/**
 * Container component which contains common styles / behaviors for items in a Menu.
 * @param {Object} props
 * @param {IconDefinition=} props.icon - The default FontAwesome icon to display.
 * @param {string=} props.label - The default text content of the label.
 * @param {React.ReactNode=} props.children - Child elements, if icon/label are used, children will render next to these.
 * @param {'default'|'danger'|'success'=} props.variant - Optional variant styling to change the feel of icon/label.
 * @param {string=} props.className - Additional styles to apply to the item. 
 * @param {boolean=} props.disabled - If true, will apply styles and disable interaction with the element, onClick will not fire. 
 * @param {function=} props.onClick - Callback function invoked when the item is clicked on. 
 */
const MenuItem = forwardRef(({ icon, label, children, variant, className, disabled, ...props }, ref) => {

    return (
        <button
            {...props}
            role="menuitem"
            disabled={disabled}
            className={
                cx(
                    'group flex items-center w-full cursor-pointer select-none text-left',
                    'p-4 gap-4 sm:p-3 sm:gap-3 md:p-2 md:gap-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'hover:bg-gray-100 hover:text-gray-900 ', // todo remove when managed by dropdown.
                    'text-gray-700 focus:outline-none focus:bg-gray-100',
                    className
                )
            }
            ref={ref}
        >
            <MenuItemIcon icon={icon} variant={variant} />
            <MenuItemLabel className="flex-1" variant={variant}>{label}</MenuItemLabel>
            {children}
        </button >
    )
});

MenuItem.propTypes = {
    __type: PropTypes.string
};

MenuItem.defaultProps = {
    __type: 'MenuItem'
};

export { MenuItem };