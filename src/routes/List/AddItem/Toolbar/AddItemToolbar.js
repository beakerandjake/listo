import cx from 'classnames'
import isEqual from 'lodash.isequal';
import { Transition } from 'components/Transition';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useRef } from 'react';
import { defaultItem } from '../AddItem';
import { AddItemToolbarCollapsibleBar, elementIsPartOfToolbar } from './AddItemToolbarCollapsibleBar';
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
    open,
    onOpenChange,
    item,
    onItemChange,
    itemIsValid,
    onAddItem,
}) => {
    const containerRef = useRef(null);

    // Will minimize the toolbar unless the user is interacting with it.
    const tryToHideToolbar = e => {
        // If the user is interacting with a toolbar menu, then don't minimize the toolbar. 
        // This edge case can happen if menu items are portalled they will technically
        // not be a child of this containerRef, so the useOnClickOutside hook will fire 
        // even thought the outside element is really "inside" the menu.
        if (elementIsPartOfToolbar(e.target)) {
            return;
        }

        // Don't close the toolbar if the user has pending edits to the item.
        if (!isEqual(item, defaultItem)) {
            return;
        }

        onOpenChange(false);
    };

    // Whenever the user clicks outside of this component, try to minimize the toolbar.
    // Disabled these event listeners if the toolbar isn't visible.
    useOnClickOutside(tryToHideToolbar, !open, containerRef);

    return (
        <div ref={containerRef}>
            {/* Input bar */}
            <div
                className={cx(
                    { 'rounded-b': !open },
                    'border rounded-t border-gray-300 shadow',
                    'transition-[border-radius] duration-300 overflow-hidden'
                )}
            >
                <AddItemToolbarInput
                    value={item.name}
                    onChange={name => onItemChange({ name })}
                    onSubmit={onAddItem}
                    onFocus={() => onOpenChange(true)}
                />
            </div>
            {/* Collapsible toolbar */}
            <div className="overflow-hidden -mb-3 pb-3 -mx-2 px-2">
                <Transition
                    in={open}
                    unmountOnExit
                    classNames={{
                        enter: '-translate-y-full opacity-0',
                        enterActive: 'transition-[transform,opacity] ease-out duration-300 !translate-y-0 !opacity-100',
                        exit: 'h-10 opacity-100',
                        exitActive: 'transition-[height,opacity] ease-in !h-0 !opacity-100'
                    }}
                >
                    {/* Wrap in div to prevent padding issue when animating */}
                    <div className="shadow rounded-b">
                        <AddItemToolbarCollapsibleBar
                            item={item}
                            onItemChange={onItemChange}
                            canAddItem={itemIsValid}
                            onAddItem={onAddItem}
                        />
                    </div>
                </Transition>
            </div>
        </div>

    );
}