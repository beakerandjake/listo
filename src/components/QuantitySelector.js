import { useEffect, useState } from "react";
import cx from 'classnames';
import { useLongPress } from "hooks/useLongPress";
import { IconButton } from "components/IconButton";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * Styled Quantity button which can be pressed or long held.
 * @param {object} props - The props
 * @param {date} props.title - The tooltip to display on hover.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {boolean} props.disabled - Is the button disabled?
 * @param {function} props.onClick - Callback invoked once when the button is clicked, or regularly when the button is held 
 */
const QuantityButton = ({ title, icon, disabled, onClick }) => {
    const [pressStartTime, setPressStartTime] = useState(null);

    // When the user holds down the button, fire click events at an interval.
    useLongPress(pressStartTime, () => onClick());

    /**
     * Handle edge case where button is disabled while being held down.
     */
    useEffect(() => {
        if (disabled) {
            setPressStartTime(null);
        }
    }, [disabled]);

    /**
     * Handle the user pressing down on us.
     */
    const onPressDown = () => {
        if (disabled) {
            return;
        }

        onClick();
        setPressStartTime(new Date());
    }

    /**
     * Handle the user releasing us.
     */
    const onRelease = () => {
        setPressStartTime(null);
    }

    return (
        <IconButton
            title={title}
            icon={icon}
            className="flex-1 text-4xl md:text-base enabled:hover:bg-gray-100 select-none"
            onMouseDown={onPressDown}
            onMouseUp={onRelease}
            onTouchStart={onPressDown}
            onTouchEnd={e => {
                e.preventDefault()
                onRelease();
            }}
            disabled={disabled}
        />
    )
};

// TODO could make dynamic if re-use this component outside of context of items.
const MAX_QUANTITY = 100;
const EXTERNAL_MIN_QUANTITY = 1;
const INTERNAL_MIN_QUANTITY = 0;

/**
 * Styled numeric input field.
 * @param {object} props - The props
 * @param {number} props.value - The value of the input field..
 * @param {function} props.onValueChange - Callback invoked when the value changes. 
 */
const QuantityInput = ({
    value,
    onValueChange
}) => {
    // Use internal value to bind to the input to prevent
    // Some edge cases with numeric input when min value is not zero.
    const [internalValue, setInternalValue] = useState('');

    // Whenever the value changes, sync our internal value.
    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    // Fired when the user changes the input value. 
    const onInputChange = e => {
        // Strip out any non-numeric characters and parse the input as a number.
        const value = parseInt(e.target.value.replace(/[^\d]/, '') || 0);

        // Don't let the user keep typing if the new value will surpass the max.
        if (value > MAX_QUANTITY) {
            return;
        }

        // If the value is a zero, then change the value to empty. 
        // This makes a better display than a leading zero.
        if (value <= INTERNAL_MIN_QUANTITY) {
            setInternalValue('');
            return;
        }

        setInternalValue(e.target.value);
        onValueChange(Math.max(EXTERNAL_MIN_QUANTITY, Math.min(MAX_QUANTITY, value)));
    }

    // Reset internal value back to our prop value when the user blurs. 
    // This ensures that they can't leave the input in a weird state.
    const onInputBlur = () => {
        setInternalValue(value);
    }

    return (
        <input
            type="number"
            value={internalValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
            pattern="\d*"
            max={MAX_QUANTITY}
            min={INTERNAL_MIN_QUANTITY}
            className={cx(
                'p-0 h-full max-w-[4ch] rounded border-none keyboard-only-focus-ring',
                'leading-none text-5xl md:text-xl font-light md:font-semibold text-center'
            )}
        />
    );
};

/**
 * Component which allows the user to adjust a numeric quantity via plus or minus buttons or via raw input.
 * @param {object} props - The props
 * @param {number} props.quantity - The quantity.
 * @param {function} props.onQuantityChange - Callback invoked when the quantity changes. 
 */
export const QuantitySelector = ({ quantity, onQuantityChange }) => {
    return (
        <div className="flex flex-1 items-stretch justify-between px-2 py-2 select-none">
            <QuantityButton
                title="Decrease Quantity"
                icon={faMinus}
                onClick={() => {
                    onQuantityChange(quantity - 1);
                }}
                disabled={quantity <= EXTERNAL_MIN_QUANTITY}
            />
            <span className="flex-1 flex items-center justify-center">
                <QuantityInput value={quantity} onValueChange={onQuantityChange} />
            </span>
            <QuantityButton
                title="Increase Quantity"
                icon={faPlus}
                onClick={() => {
                    onQuantityChange(quantity + 1);
                }}
                disabled={quantity >= MAX_QUANTITY}
            />
        </div >
    )
};