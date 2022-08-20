import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import isEqual from 'lodash.isequal';
import cx from 'classnames';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { AddItemInput } from './AddItemInput';
import { AddItemToolbar } from './Toolbar/AddItemToolbar';
import { useOnScroll } from 'hooks/useOnScroll';

const DEFAULT_ITEM = {
    name: '',
    dueDate: null,
    quantity: 1
}

export function AddItem(props) {
    const containerRef = useRef(null);
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [item, setItem] = useState(DEFAULT_ITEM);
    const nameValid = item.name && item.name.length > 1;

    // Will minimize the toolbar unless the user is interacting with it.
    const tryToHideToolbar = e => {
        // todo ignore if clicking on toolbar menu
        // const z = e.target.closest(`.${toolbarMenuClassName}`);

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
    const onAddItem = () => {
        if (!nameValid || props.disabled) {
            return;
        }

        props.onAddItem(item);
        setItem(DEFAULT_ITEM);
    };

    return (
        <div
            ref={containerRef}
            className="rounded border border-gray-300 shadow-md overflow-hidden"
        >
            {toolbarVisible ? 'true' : 'false'}
            <div className={cx({ 'border-b border-gray-300': toolbarVisible }, 'transition-all duration-75')}>
                <AddItemInput
                    value={item.name}
                    onChange={name => onItemChange({ name })}
                    onSubmit={onAddItem}
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
                    onAddItem={onAddItem}
                />
            </Transition>
        </div >
    )
}