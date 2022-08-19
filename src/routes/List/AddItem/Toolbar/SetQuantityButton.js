import { useState } from "react";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';
import { ToolbarButton } from "./ToolbarButton";
import { SetQuantityMenu } from "routes/List/Item/SetQuantityMenu";

/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.quantity - The current due date of the item.
 * @param {function} props.onQuantityChange - Callback invoked when the user changes the due date. 
 * @param {function} props.onMenuOpenChange - Callback invoked when the user opens or closes the menu. 
 */
export function SetQuantityButton({
    quantity,
    onQuantityChange,
    onMenuOpenChange
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Opens or closes the menu and notifies anyone interested.
    const setMenuOpenAndNotify = open => {
        setMenuOpen(open);
        onMenuOpenChange(open);
    };

    // Fires the quantity change callback and closes the menu.
    const updateQuantityAndCloseMenu = newQuantity => {
        setMenuOpenAndNotify(false);
        onQuantityChange(newQuantity);
    }

    return (
        <SetQuantityMenu
            quantity={quantity}
            onChange={onQuantityChange}
            onReset={() => updateQuantityAndCloseMenu(1)}
            open={menuOpen}
            onClose={() => setMenuOpenAndNotify(false)}
            trigger={(
                <ToolbarButton
                    icon={faPlusMinus}
                    title="Change Quantity"
                    text={quantity > 1 && `Qty: ${quantity}`}
                    onClick={() => setMenuOpenAndNotify(!menuOpen)}
                    className={cx({ 'text-indigo-700': quantity > 1 })}
                />
            )}
        />
    )
}