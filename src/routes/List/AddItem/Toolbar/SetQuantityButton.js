import { useEffect, useRef, useState } from "react";
import { faMinus, faPlus, faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { ToolbarButton } from "./ToolbarButton";
import { MenuHeader, MenuItem, MenuSeparator, MenuTitle, ResponsiveMenu, ScrollableMenuContent } from "components/Menu";
import { IconButton } from "components/IconButton";
import { CSSTransition } from "react-transition-group";
import { useLongPress } from "hooks/useLongPress";


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
            className="cursor:pointer flex-1 disabled:opacity-50 disabled:cursor-not-allowed rounded keyboard-only-focus-ring text-4xl md:text-base enabled:hover:bg-gray-100 select-none"
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
}

const QuantityControl = ({ quantity, onQuantityChange }) => {
    const [animate, setAnimate] = useState(false);
    const animateRef = useRef();

    return (
        <div className="flex w-full flex-1 items-stretch justify-between min-h-[8rem] md:min-h-[3rem] px-2 py-2 select-none">
            <QuantityButton
                title="Decrease Quantity"
                icon={faMinus}
                onClick={() => {
                    setAnimate(true); onQuantityChange(quantity - 1);
                }}
                disabled={quantity <= 1}
            />
            <span className="flex-1 flex items-center justify-center text-5xl md:text-2xl font-light md:font-semibold  select-none">
                <CSSTransition
                    in={animate}
                    timeout={75}
                    nodeRef={animateRef}
                    classNames={{
                        enter: 'transition ease-in',
                        enterActive: 'scale-125',
                        enterDone: 'scale-100'
                    }}
                    onEntered={() => setAnimate(false)}
                >
                    <span ref={animateRef}>{quantity}</span>
                </CSSTransition>
            </span>
            <QuantityButton
                title="Increase Quantity"
                icon={faPlus}
                onClick={() => {
                    setAnimate(true);
                    onQuantityChange(quantity + 1);
                }}
            />
        </div >
    )
}

/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.quantity - The current due date of the item.
 * @param {function} props.onQuantityChange - Callback invoked when the user changes the due date. 
 */
export function SetQuantityButton({ quantity, onQuantityChange }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const updateQuantity = newQuantity => {
        setMenuOpen(false);
        onQuantityChange(newQuantity);
    }

    // return (
    //     <SetDueDateMenu
    //         open={menuOpen}
    //         onClose={() => setMenuOpen(false)}
    //         dueDate={dueDate}
    //         onDueDateChange={onDateChange}
    //         trigger={(
    //             <ToolbarButton
    //                 icon={!!dueDate ? faCalendarCheck : faCalendarPlus}
    //                 title="Add Due Date"
    //                 text={dueDate && formatDueDate(dueDate)}
    //                 onClick={() => setMenuOpen(!menuOpen)}
    //             />
    //         )}
    //     />
    // )

    return (
        <ResponsiveMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            trigger={(
                <ToolbarButton
                    icon={faPlusMinus}
                    title="Change Quantity"
                    text={quantity > 1 && `Qty: ${quantity}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            )}
        >
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Change Quantity</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent className="flex flex-col items-center justify-center">
                <QuantityControl quantity={quantity} onQuantityChange={quantity => onQuantityChange(quantity)} />
                <MenuSeparator />
                <MenuItem
                    label="Reset"
                    variant="danger"
                    disabled={quantity <= 1}
                    onClick={() => updateQuantity(1)} className="text-center"
                />
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}