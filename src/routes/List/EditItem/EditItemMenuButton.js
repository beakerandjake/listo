import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { SwitchTransition, FadeAndPopIn } from 'components/Transition';
import { IconButton } from 'components/IconButton';

const VARIANT_STYLES = {
    default: 'text-gray-400',
    success: 'text-indigo-700',
    danger: 'text-red-700'
}

/**
 * An ItemFieldMenuButton that allows the user to view / edit the item quantity.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.placeholder - The text to render if no children are provided.
 * @param {'default'|'success'|'danger'} props.variant - The variant style of the button.
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 * @param {function} props.onClearValue - Callback invoked when the user clicks the clear button.
 * @param {string} props.clearButtonTitle - The title to display when hovering the clear button.
 * @param {React.ReactNode} props.children - The child element.  
 */
export const EditItemMenuButton = forwardRef(({
    icon,
    placeholder = '',
    variant = 'default',
    onClick,
    onClearValue,
    clearButtonTitle,
    children,
    ...props
}, ref) => {
    const variantStyle = VARIANT_STYLES[variant];

    return (
        <div
            {...props}
            ref={ref}
            className={cx(
                'min-h-[3.5rem] flex justify-between flex-1 w-full cursor-pointer select-none',
                'bg-white hover:bg-slate-100 border-gray-300 border rounded',
            )}
        >
            <div
                onClick={() => onClick()}
                className={cx(
                    variantStyle,
                    'transition-colors duration-150',
                    'flex-1 py-2 pl-3 flex items-center '
                )}
            >
                <FontAwesomeIcon icon={icon} fixedWidth className="mx-3" />
                {/* Display placeholder if no children */}
                <SwitchTransition switchKey={!!children} as={FadeAndPopIn}>
                    {!!children ? children : placeholder}
                </SwitchTransition>
            </div>
            {/* Reset Value Button */}
            <FadeAndPopIn in={!!children} unmountOnExit>
                <IconButton
                    icon={faTimes}
                    className="w-[10%]"
                    onClick={() => onClearValue()}
                    title={clearButtonTitle}
                />
            </FadeAndPopIn>
        </div>
    )
});