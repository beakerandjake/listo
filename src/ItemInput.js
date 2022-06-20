import React, { useState } from 'react';

export default function ItemInput(props) {
    const [name, setName] = useState('');

    const onClickAddButton = () => {
        if (!name || name.length <= 1) {
            return;
        }

        props.onAddItem(name);
        setName('');
    };

    const onKeyDown = e => {
        if (e.key !== 'Enter') {
            return;
        }

        onClickAddButton();
    }

    return (
        <div className="w-full pt-6 mb-4 flex items-center">
            <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 focus:border-green-700 focus:outline-none" type="text"
                placeholder='What do we need?'
                value={name}
                onChange={e => setName(e.target.value)} onKeyDown={onKeyDown} disabled={props.disabled} 
                autoFocus />
            {/* <button className="fa-solid fa-plus bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-2 px-3 border border-green-500 rounded" onClick={onClickAddButton} disabled={props.disabled || !name}></button> */}
        </div>
    );
}