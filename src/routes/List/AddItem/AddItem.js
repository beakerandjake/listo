import { useRef, useState } from 'react';
import isEqual from 'lodash.isequal';
import cx from 'classnames';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { AddItemInput } from './AddItemInput';
import { AddItemToolbar, elementIsPartOfToolbar } from './AddItemToolbar';
import { Transition } from 'components/Transition';

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

    //  className="rounded border border-gray-300 shadow-md shadow-black/20 overflow-hidden mb-3"


    return (
        <div ref={containerRef}>
            <div
                className={cx(
                    { 'border-b': toolbarVisible },
                    { 'rounded-b': !toolbarVisible },
                    'border-x border-t rounded-t border-gray-300',
                    'transition-[border-radius, border-width] duration-300 overflow-hidden shadow-md shadow-black/20'
                )}
            >
                <AddItemInput
                    value={item.name}
                    onChange={name => onItemChange({ name })}
                    onSubmit={tryToAddItem}
                    onFocus={() => setToolbarVisible(true)}
                />
            </div>
            <div className="overflow-hidden -mb-3 pb-3 -mx-2 px-2">
                <Transition
                    in={toolbarVisible}
                    unmountOnExit
                    classNames={{
                        enter: '-translate-y-full opacity-0',
                        enterActive: 'transition-[transform,opacity] ease-out duration-300 !translate-y-0 !opacity-100',
                        exit: 'h-10 opacity-100',
                        exitActive: 'transition-[height,opacity] ease-in !h-0 !opacity-100'
                    }}
                >
                    {/* Wrap in div to prevent padding issue when animating */}
                    <div className="shadow-md rounded-b shadow-black/20">
                        <AddItemToolbar
                            item={item}
                            onItemChange={onItemChange}
                            canAddItem={nameValid}
                            onAddItem={tryToAddItem}
                        />
                    </div>
                </Transition>
            </div>
        </div >
    )
}