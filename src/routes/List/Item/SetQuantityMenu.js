import { MenuHeader, MenuItem, MenuSeparator, MenuTitle, ResponsiveMenu, ScrollableMenuContent } from "components/Menu";
import { QuantitySelector } from "components/QuantitySelector";

/**
 * Responsive menu which allows the user to edit the item quantity.
 * @param {Object} props - The props (spread onto the responsive menu)
 * @param {number} props.quantity - The current quantity.
 * @param {function} props.onChange - Callback fired when the quantity changes.
 * @param {boolean} props.open - Should the menu be opened or closed?
 * @param {function} props.onClose - Callback fired when the menu is closed.
 * @param {ReactElement} props.trigger -  The trigger element to render and position the floating content against.
 */
export const SetQuantityMenu = ({
    quantity,
    onChange,
    open,
    onClose,
    trigger,
    ...props
}) => {

    return (
        <ResponsiveMenu
            {...props}
            open={open}
            onClose={onClose}
            trigger={trigger}
            desktopPlacement='bottom-start'
        >
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Change Quantity</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent className="flex flex-col items-center justify-center">
                <div className="flex w-full items-stretch justify-between min-h-[8rem] md:min-h-[3rem]">
                    <QuantitySelector quantity={quantity} onQuantityChange={onChange} />
                </div>
                <MenuSeparator />
                <MenuItem
                    label="Reset"
                    variant="danger"
                    disabled={quantity <= 1}
                    onClick={() => onChange(1)} className="text-center"
                />
            </ScrollableMenuContent>
        </ResponsiveMenu>
    );
};