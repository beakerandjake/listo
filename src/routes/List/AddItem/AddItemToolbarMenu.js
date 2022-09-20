import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/pro-regular-svg-icons";
import { faCalendarCheck, faCalendarPlus, faPlusMinus } from "@fortawesome/pro-regular-svg-icons";
import cx from 'classnames';
import { formatDueDate } from "services/dueDateHelpers";
import { Button } from 'components/Button';
import { ItemDueDateMenu, ItemNoteInput, ItemQuantityMenu } from "routes/List/Item";
import { MenuHeader, MenuItem, MenuSeparator, MenuTitle, ResponsiveMenu, ScrollableMenuContent, StatefulMenu } from "components/Menu";

/**
 * Button styled for the Add Item Toolbar.
 * @param {Object} props - The props.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string=} props.text - The text to display (if any). 
 * @param {string=} props.className - Additional styles to apply. 
 */
const AddItemToolbarButton = forwardRef(({
    icon,
    text,
    className,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            {...props}
            className={cx(
                'p-1 flex items-center justify-between gap-1 leading-0 keyboard-only-focus-ring',
                'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                'rounded border border-gray-300 bg-white enabled:hover:bg-gray-50 text-gray-700',
                className
            )}
        >
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
export function AddItemToolbarMenu({
    item,
    onItemChange,
    canAddItem,
    onAddItem,
}) {
    return (
        <div
            className={cx(
                'h-10 px-3 py-2 flex items-center justify-between',
                'bg-slate-100 shadow-inner'
            )}
        >
            {/* Item edit buttons */}
            <div className="flex items-center gap-2">
                <ItemDueDateMenu
                    dueDate={item.dueDate}
                    onChange={dueDate => onItemChange({ dueDate })}
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
                <ItemQuantityMenu
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
                
                {/* Item Note Menu */}
                <StatefulMenu>
                    {({ open, setOpen }) => (
                        <ResponsiveMenu
                            open={open}
                            onClose={() => setOpen(false)}
                            desktopPlacement="bottom-start"
                            trigger={(
                                <AddItemToolbarButton
                                    icon={faComment}
                                    title="Add Note"
                                    className={cx({ 'text-indigo-700': !!item.note })}
                                    onClick={() => setOpen(!open)}
                                />
                            )}
                        >
                            <MenuHeader className="flex items-center justify-center">
                                <MenuTitle>Item Note</MenuTitle>
                            </MenuHeader>
                            <ScrollableMenuContent className="flex flex-col items-center justify-center">
                                <div className="p-1">
                                    <ItemNoteInput
                                        value={item.note}
                                        onChange={value => onItemChange({ note: value })}
                                    />
                                </div>
                                <MenuSeparator />
                                <MenuItem
                                    label="Clear"
                                    variant="danger"
                                    disabled={!item.note}
                                    onClick={() => {
                                        setOpen(false);
                                        onItemChange({ note: '' });
                                    }}
                                    className="text-center"
                                />
                            </ScrollableMenuContent>
                        </ResponsiveMenu>
                    )}
                </StatefulMenu>
            </div>

            {/* Add item button */}
            <Button
                size="xs"
                title="Add Item"
                disabled={!canAddItem}
                onClick={onAddItem}
            >
                Add
            </Button>
        </div>
    )
}