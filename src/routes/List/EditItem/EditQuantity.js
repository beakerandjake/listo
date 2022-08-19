import { useState } from 'react';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { SetQuantityMenu } from '../Item/SetQuantityMenu';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';

/**
 * Allows the user to set or edit the quantity and displays the current quantity (if any)
 * @param {Object} props - The Props.
 * @param {number} props.quantity - The current quantity.
 * @param {function} props.onChange - Callback fired when the quantity changes
 */
export const EditQuantity = ({
    quantity, onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const setQuantityAndCloseMenu = value => {
        setIsOpen(false);
        onChange(value);
    };

    return (
        <SetQuantityMenu
            open={isOpen}
            onClose={() => setIsOpen(false)}
            quantity={quantity}
            onChange={onChange}
            onReset={setQuantityAndCloseMenu}
            trigger={(
                <ItemFieldMenuButton
                    icon={faPlusMinus}
                    placeholder="Change Quantity"
                    clearButtonTitle="Reset Quantity"
                    onClick={() => setIsOpen(true)}
                    onClearValue={() => setQuantityAndCloseMenu(1)}
                    variant={quantity > 1 ? 'success' : 'default'}
                >
                    {quantity > 1 && (
                        <span>Quantity: {quantity}</span>
                    )}
                </ItemFieldMenuButton>
            )}
            desktopPlacement='bottom'
            desktopOffset={1}
        />
    )
};  