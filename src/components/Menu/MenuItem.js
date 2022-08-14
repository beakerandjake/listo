import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
 * 
 */
export function MenuItem({ icon, label, children, variant, className, disabled, onClick, ...rest }) {

    const handleClick = e => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        onClick();
    };

    return (
        <div
            {...rest}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            onClick={handleClick}
            className={
                cx(
                    'group flex items-center w-full cursor-pointer select-none',
                    'p-4 gap-4 sm:p-3 sm:gap-3 md:p-2 md:gap-2',
                    'select-none keyboard-only-focus-ring',
                    'text-gray-700 hover:bg-gray-100 hover:text-gray-900 keyboard-only-focus-ring',
                    { 'pointer-events-none opacity-50': disabled },
                    className
                )
            }
        >
            <MenuItemIcon icon={icon} variant={variant} />
            <MenuItemLabel className="flex-1" variant={variant}>{label}</MenuItemLabel>
            {children}
        </div >
    )
}