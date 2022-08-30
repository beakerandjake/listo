import { faPlusMinus } from "@fortawesome/pro-solid-svg-icons"
import { ItemQuantityMenu, ItemFieldMenuButton } from 'routes/List/Item';

/**
 * An ItemFieldMenuButton that allows the user to view / edit the item quantity.
 * @param {Object} props
 * @param {number} props.quantity - The item quantity.
 * @param {function} props.onChange - Callback invoked when quantity is changed. 
 */
export const EditItemQuantity = ({
    quantity,
    onChange
}) => {
    return (
        <ItemQuantityMenu
            quantity={quantity}
            onChange={onChange}
            onReset={onChange}
            trigger={(
                <ItemFieldMenuButton
                    icon={faPlusMinus}
                    placeholder="Change Quantity"
                    clearButtonTitle="Reset Quantity"
                    onClearValue={() => onChange(1)}
                    variant={quantity > 1 ? 'success' : 'default'}
                    title="Change Quantity"
                >
                    {quantity > 1 && <span>Quantity: {quantity}</span>}
                </ItemFieldMenuButton>
            )}
            desktopPlacement='bottom'
            desktopOffset={1}
        />
    )
}