import { AddItemToolbarMenu } from './AddItemToolbarMenu';
import { AddItemToolbarInput } from './AddItemToolbarInput'

/**
 * Component suited for larger screens which allows users to create a new item
 * @param {Object} props - The props.
 * @param {object} props.item - The item being added.
 * @param {function} props.onItemChange - Callback invoked when the user changes a property of the item. 
 * @param {boolean} props.itemIsValid - Is the item in a valid state to be added to the list? 
 * @param {function} props.onAddItem - Callback invoked when the user clicks the add Item button. 
 */
export const AddItemToolbar = ({
    item,
    onItemChange,
    itemIsValid,
    onAddItem,
}) => {
    return (
        <div className="rounded-md border border-gray-300 shadow overflow-hidden">
            <AddItemToolbarInput
                value={item.name}
                onChange={name => onItemChange({ name })}
                onSubmit={onAddItem}
            />
            <AddItemToolbarMenu
                item={item}
                onItemChange={onItemChange}
                canAddItem={itemIsValid}
                onAddItem={onAddItem}
            />
        </div>
    );
}