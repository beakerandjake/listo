import React, { useState } from 'react';

export default function ItemInput(props) {
    const [itemName, setItemName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!itemName || itemName.length <= 1 || props.disabled) {
            return;
        }

        props.onAddItem(itemName);
        setItemName('');
    }

    const onInput = e => {
        setItemName(e.target.value);
    }

    return (
        <form className="sticky top-16 z-10 w-full flex items-center md:px-0" onSubmit={handleSubmit}>
            <input
                className="shadow appearance-none border-gray-200 w-full px-3 text-gray-700 focus:outline-none focus:ring-0 focus:border-inherit"
                type="text"
                placeholder='What do we need?'
                value={itemName}
                onInput={onInput}
                autoFocus
                enterKeyHint='done'
            />
        </form>
    );
}