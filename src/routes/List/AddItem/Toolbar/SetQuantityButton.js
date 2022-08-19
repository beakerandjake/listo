import { useEffect, useState } from "react";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { ToolbarButton } from "./ToolbarButton";
import { MenuHeader, MenuItem, MenuSeparator, MenuTitle, ResponsiveMenu, ScrollableMenuContent } from "components/Menu";
import { QuantitySelector } from "components/QuantitySelector";

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
        <ResponsiveMenu
            open={menuOpen}
            onClose={() => setMenuOpenAndNotify(false)}
            trigger={(
                <ToolbarButton
                    icon={faPlusMinus}
                    title="Change Quantity"
                    text={quantity > 1 && `Qty: ${quantity}`}
                    onClick={() => setMenuOpenAndNotify(!menuOpen)}
                />
            )}
        >
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Change Quantity</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent className="flex flex-col items-center justify-center">
                <div className="flex w-full items-stretch justify-between min-h-[8rem] md:min-h-[3rem]">
                    <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={quantity => onQuantityChange(quantity)}
                    />
                </div>
                <MenuSeparator />
                <MenuItem
                    label="Reset"
                    variant="danger"
                    disabled={quantity <= 1}
                    onClick={() => updateQuantityAndCloseMenu(1)} className="text-center"
                />
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}