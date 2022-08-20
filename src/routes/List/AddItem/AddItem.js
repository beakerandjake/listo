import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import isEqual from 'lodash.isequal';
import cx from 'classnames';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { AddItemInput } from './AddItemInput';
import { AddItemToolbar, elementIsPartOfToolbar } from './AddItemToolbar';
import { useOnScroll } from 'hooks/useOnScroll';

const DEFAULT_ITEM = {
    name: '',
    dueDate: null,
    quantity: 1
}

/**
 * Allows the user to add a new Item to the list.
 * @param {object} props - the props
 * @param {function} props.onAddItem - Callback invoked when the user adds a new Item to the list.
 * @param {boolean} props.disabled - Should the input be disabled?
 **/
export function AddItem({
    onAddItem,
    disabled,
}) {
    const containerRef = useRef(null);
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [item, setItem] = useState(DEFAULT_ITEM);
    const nameValid = item.name && item.name.length > 1;

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
        if (!isEqual(item, DEFAULT_ITEM)) {
            return;
        }

        setToolbarVisible(false);
    };

    // Whenever the user clicks outside of this component, try to minimize the toolbar.
    // Disabled these event listeners if the toolbar isn't visible.
    useOnClickOutside(tryToHideToolbar, !toolbarVisible, containerRef);
    useOnScroll(tryToHideToolbar, !toolbarVisible);

    // Callback invoked whenever the user makes changes to the item.
    const onItemChange = changes => {
        setItem({ ...item, ...changes });
    };

    // Callback invoked when the user submits the item.
    const tryToAddItem = () => {
        if (!nameValid || disabled) {
            return;
        }

        onAddItem(item);
        setItem(DEFAULT_ITEM);
    };

    return (
        <div
            ref={containerRef}
            className="rounded border border-gray-300 shadow-md shadow-black/20 overflow-hidden mb-3"
        >
            <div className={cx({ 'border-b border-gray-300': toolbarVisible }, 'transition-all duration-75')}>
                <AddItemInput
                    value={item.name}
                    onChange={name => onItemChange({ name })}
                    onSubmit={tryToAddItem}
                    onFocus={() => setToolbarVisible(true)}
                />
            </div>
            <Transition
                show={toolbarVisible}
                enter="transition-all ease-out duration-400"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-[50px]  opacity-100"
                leave="transition-all ease-in duration-150"
                leaveFrom="opacity-100 max-h-[50px]"
                leaveTo="opacity-0 max-h-0"
            >
                <AddItemToolbar
                    item={item}
                    onItemChange={onItemChange}
                    canAddItem={nameValid}
                    onAddItem={tryToAddItem}
                />
            </Transition>
        </div >
    )
}