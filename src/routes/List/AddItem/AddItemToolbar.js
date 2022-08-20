import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';
import { Button } from 'components/Button';
import { faCalendarCheck, faCalendarPlus, faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { SetDueDateMenu } from "routes/List/Item";
import { SetQuantityMenu } from "routes/List/Item/SetQuantityMenu";
import { formatDueDate } from "services/dueDateHelpers";

// Class that should be applied to toolbar menus.
const TOOLBAR_MENU_CLASS = 'add-item-toolbar-menu';

export function elementIsPartOfToolbar(element) {
    return !!element.closest(`.${TOOLBAR_MENU_CLASS}`);
}

/**
 * Button styled for the Add Item Toolbar.
 * @param {Object} props - The props.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string=} props.text - The text to display (if any). 
 * @param {string=} props.className - Additional styles to apply. 
 */
export const AddItemToolbarButton = forwardRef(({
    icon,
    text,
    className,
    ...props
}, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            className={cx(
                'p-1 flex items-center justify-between gap-1 leading-0 keyboard-only-focus-ring',
                'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                'rounded shadow-sm border border-gray-300 bg-white enabled:hover:bg-gray-50 text-gray-700',
                className
            )}>
            <FontAwesomeIcon icon={icon} fixedWidth />
            {text && <span className="text-sm leading-none">{text}</span>}
        </button>
    )
});

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
    onAddItem,
}) {
    return (
        <div className="px-3 py-2 bg-slate-100 flex items-center justify-between">
            {/* Item edit buttons */}
            <div className="flex items-center gap-2 sm:gap-3">

                <SetDueDateMenu
                    className={TOOLBAR_MENU_CLASS}
                    dueDate={item.dueDate}
                    onDueDateChange={dueDate => onItemChange({ dueDate })}
                    trigger={(
                        <AddItemToolbarButton
                            icon={!!item.dueDate ? faCalendarCheck : faCalendarPlus}
                            title="Add Due Date"
                            text={item.dueDate && formatDueDate(item.dueDate)}
                            className={cx({ 'text-indigo-700': !!item.dueDate })}
                        />
                    )}
                    desktopPlacement="bottom-start"
                />

                <SetQuantityMenu
                    className={TOOLBAR_MENU_CLASS}
                    quantity={item.quantity}
                    onChange={quantity => onItemChange({ quantity })}
                    onReset={quantity => onItemChange({ quantity })}
                    trigger={(
                        <AddItemToolbarButton
                            icon={faPlusMinus}
                            title="Change Quantity"
                            text={item.quantity > 1 && `Qty: ${item.quantity}`}
                            className={cx({ 'text-indigo-700': item.quantity > 1 })}
                        />
                    )}
                    desktopPlacement='bottom-start'
                />
            </div>

            {/* Add item button */}
            <Button size="sm" disabled={!canAddItem} onClick={onAddItem}>Add</Button>
        </div>

    )
}