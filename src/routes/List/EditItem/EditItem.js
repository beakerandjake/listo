import { useState, useEffect, forwardRef } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faArrowLeft, faArrowRightFromBracket, faCalendarDay, faCalendarPlus, faPlusMinus, faT, faTimes, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { Drawer } from 'components/Drawer';
import { MenuFooter, MenuHeader, MenuSeparator, MenuTitle } from 'components/Menu';
import { IconButton } from 'components/IconButton';
import { CompletedCheckbox, SetDueDateMenu } from '../Item';
import { NameLabel } from '../Item';
import { QuantityButton } from '../Item';
import { DueDateStatus } from '../Item';
import { EditItemField } from './EditItemField';
import { DebounceInput } from "react-debounce-input";
import { QuantitySelector } from 'components/QuantitySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDueDate, isOverdue } from 'services/dueDateHelpers';

const VARIANT_STYLES = {
    default: 'text-gray-400',
    success: 'text-indigo-700',
    danger: 'text-red-700'
}

const ItemFieldMenuButton = forwardRef(({
    icon,
    placeholder,
    variant = 'default',
    children,
    onClick,
    onClearValue,
    clearButtonTitle
}, ref) => {
    const variantStyle = VARIANT_STYLES[variant];

    return (
        <div
            ref={ref}
            className={cx(
                'min-h-[3.5rem] flex justify-between flex-1 w-full cursor-pointer select-none',
                'bg-white hover:bg-slate-100 border-gray-300 border rounded',
            )}
        >
            <div
                onClick={() => onClick()}
                className={cx(variantStyle, 'flex-1 py-2 pl-3 flex items-center')}
            >
                <FontAwesomeIcon icon={icon} fixedWidth className="mx-3" />
                {!children && <span>{placeholder}</span>}
                {children}
            </div>
            {/* Show the close button if the field has a value. */}
            {!!children && (
                <IconButton
                    icon={faTimes}
                    className="w-[10%]"
                    onClick={() => onClearValue()}
                    title={clearButtonTitle}
                />
            )}
        </div>
    )
});

/**
 * Drawer which allows the user to edit fields of an Item.
 * @param {Object} props
 * @param {Object} props.item - The item which can be edited.
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed. 
 * @param {function} props.onEditItem - Callback invoked when the user edits a field of the item. 
 * @param {function} props.onDeleteItem - Callback invoked when the user wants to delete the item. 
 */
export function EditItem({
    item,
    onClose,
    onEditItem,
    onDeleteItem
}) {
    const [open, setOpen] = useState(false);
    const [dueDateMenuOpen, setDueDateMenuOpen] = useState(false);
    const [cachedItem, setCachedItem] = useState({});

    // any time our item changes, update our current state.
    // when the item is set, we will display the drawer
    // when the item is cleared, close the drawer but keep 
    // a reference to the cached item, that way we can still display
    // our contents as the close animation is happening.
    useEffect(() => {
        if (!item) {
            setOpen(false);
        } else {
            setCachedItem(item);
            setOpen(true);
        }
    }, [item]);

    return (
        <Drawer open={open} onClose={onClose}>
            <div className="h-full flex flex-col justify-between">
                {/* Header */}
                <MenuHeader className="flex items-center gap-3 md:p-4">
                    <IconButton icon={faArrowLeft} title="Close Item Details" onClick={() => onClose()} />
                    <MenuTitle title="">Item Details</MenuTitle>
                </MenuHeader>
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                    <div className="flex items-center">
                        <div className="-ml-2">
                            <CompletedCheckbox
                                checked={cachedItem.completed}
                                onChange={completed => onEditItem(cachedItem.id, { completed })}
                            />
                        </div>
                        <NameLabel completed={cachedItem.completed} name={cachedItem.name} className="text-lg sm:text-lg font-semibold text-gray-900" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <SetDueDateMenu
                            open={dueDateMenuOpen}
                            onClose={() => setDueDateMenuOpen(false)}
                            dueDate={cachedItem.dueDate}
                            onDueDateChange={date => {
                                setDueDateMenuOpen(false);
                                onEditItem(cachedItem.id, { dueDate: date });
                            }}
                            trigger={(
                                <ItemFieldMenuButton
                                    icon={cachedItem.dueDate ? faCalendarDay : faCalendarPlus}
                                    placeholder="Add Due Date"
                                    clearButtonTitle="Remove Due Date"
                                    onClick={() => setDueDateMenuOpen(true)}
                                    onClearValue={() => {
                                        setDueDateMenuOpen(false);
                                        onEditItem(cachedItem.id, { dueDate: null });
                                    }}
                                    variant={!cachedItem.dueDate
                                        ? 'default'
                                        : isOverdue(cachedItem.dueDate) ? 'danger' : 'success'
                                    }
                                >
                                    {cachedItem.dueDate && (
                                        <span>{formatDueDate(cachedItem.dueDate)}</span>
                                    )}
                                </ItemFieldMenuButton>
                            )}
                            desktopPlacement='bottom'
                        />


                        {/* <ItemFieldMenuButton icon={faCalendarPlus} placeholder="Add Due Date">

                        </ItemFieldMenuButton> */}

                        {/* <EditItemField label="Quantity">
                            <div className="flex w-full items-stretch justify-center flex-1">
                                <QuantitySelector quantity={cachedItem.quantity} onQuantityChange={quantity => onEditItem(cachedItem.id, { quantity })} />
                            </div>
                        </EditItemField>

                        <EditItemField label="Due Date">
                            <DueDatePicker
                                date={cachedItem.dueDate}
                                onChange={date => onEditItem(cachedItem.id, { dueDate: date })}
                            />
                            <DueDateStatus dueDate={cachedItem.dueDate} />
                        </EditItemField> */}

                        {/* <EditItemField> */}
                        <DebounceInput
                            element="textarea"
                            value={cachedItem.note}
                            onChange={event => onEditItem(cachedItem.id, { note: event.target.value })}
                            debounceTimeout={800}
                            forceNotifyByEnter={false}
                            placeholder="Add Note"
                            className="self-stretch rounded border border-gray-300"
                            rows={3}
                        />
                        {/* </EditItemField> */}
                    </div>
                </div>
                {/* Footer */}
                <MenuFooter className="flex items-center justify-between">
                    <IconButton icon={faArrowRightFromBracket} title="Close Item Details" onClick={() => onClose()} />
                    {cachedItem.created && (
                        <span className="text-sm font-semibold text-gray-500 select-none">
                            Created {formatDistanceToNow(parseISO(cachedItem.created), { addSuffix: true })}
                        </span>
                    )}
                    <IconButton icon={faTrashCan} title="Delete Item" onClick={onDeleteItem} />
                </MenuFooter>
            </div >
        </Drawer >
    )
}