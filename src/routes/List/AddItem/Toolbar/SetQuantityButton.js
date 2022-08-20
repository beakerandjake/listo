import { useState } from "react";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';
import { AddItemToolbarButton } from "./AddItemToolbar";
import { SetQuantityMenu } from "routes/List/Item/SetQuantityMenu";

/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.quantity - The current due date of the item.
 * @param {function} props.onQuantityChange - Callback invoked when the user changes the due date. 
 */
export function SetQuantityButton({
    quantity,
    onQuantityChange,
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Fires the quantity change callback and closes the menu.
    const updateQuantityAndCloseMenu = newQuantity => {
        setMenuOpen(false);
        onQuantityChange(newQuantity);
    }

    return (
        <SetQuantityMenu
            quantity={quantity}
            onChange={onQuantityChange}
            onReset={() => updateQuantityAndCloseMenu(1)}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            trigger={(
                <AddItemToolbarButton
                    icon={faPlusMinus}
                    title="Change Quantity"
                    text={quantity > 1 && `Qty: ${quantity}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={cx({ 'text-indigo-700': quantity > 1 })}
                />
            )}
            desktopPlacement='bottom-start'
        />
    )
}