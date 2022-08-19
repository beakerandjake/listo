import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { IconButton } from 'components/IconButton';

const VARIANT_STYLES = {
    default: 'text-gray-400',
    success: 'text-indigo-700',
    danger: 'text-red-700'
}

export const ItemFieldMenuButton = forwardRef(({
    icon,
    placeholder,
    variant = 'default',
    children,
    onClick,
    onClearValue,
    clearButtonTitle
}, ref) => {
    const variantStyle = VARIANT_STYLES[variant];

    return (
        <div
            ref={ref}
            className={cx(
                'min-h-[3.5rem] flex justify-between flex-1 w-full cursor-pointer select-none',
                'bg-white hover:bg-slate-100 border-gray-300 border rounded',
            )}
        >
            <div
                onClick={() => onClick()}
                className={cx(variantStyle, 'flex-1 py-2 pl-3 flex items-center')}
            >
                <FontAwesomeIcon icon={icon} fixedWidth className="mx-3" />
                {!children && <span>{placeholder}</span>}
                {children}
            </div>
            {/* Show the close button if the field has a value. */}
            {!!children && (
                <IconButton
                    icon={faTimes}
                    className="w-[10%]"
                    onClick={() => onClearValue()}
                    title={clearButtonTitle}
                />
            )}
        </div>
    )
});