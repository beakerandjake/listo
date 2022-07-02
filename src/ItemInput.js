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
        <form className="w-full pt-6 mb-4 px-2 flex items-center" onSubmit={handleSubmit}>
            <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 focus:outline-none"
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