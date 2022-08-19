import { Button } from 'components/Button';
import { SetDueDateButton } from './SetDueDateButton';
import { SetQuantityButton } from './SetQuantityButton';

/**
 * Toolbar which allows the user to edit properties of the item.
 * @param {Object} props - The props.
 * @param {object} props.item - The item being added.
 * @param {function} props.onItemChange - Callback invoked when the user changes a property of the item. 
 * @param {boolean} props.canAddItem - Is the item in a valid state to be added to the list? 
 * @param {function} props.onAddItem - Callback invoked when the user clicks the add Item button. 
 */
export function AddItemToolbar({
    item,
    onItemChange,
    canAddItem,
    onAddItem
}) {
    return (
        <div className="px-3 py-2 bg-slate-100 flex items-center justify-between">
            {/* Item edit buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
                <SetDueDateButton dueDate={item.dueDate} onDueDateChange={dueDate => onItemChange({ dueDate })} />
                <SetQuantityButton quantity={item.quantity} onQuantityChange={quantity => onItemChange({ quantity })} />
            </div>
            {/* Add item button */}
            <Button size="sm" disabled={!canAddItem} onClick={onAddItem}>Add</Button>
        </div>

    )
}