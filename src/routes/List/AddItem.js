import { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function AddItem(props) {
    const [input, setInput] = useState('');

    // is the current input a valid length to be submitted?
    const inputValid = () => {
        return input && input.length > 1;
    };

    const onAddItem = e => {
        e.preventDefault();

        if (!inputValid() || props.disabled) {
            return;
        }

        props.onAddItem(input);
        setInput('');
    };

    return (
        <form className="w-full" onSubmit={onAddItem}>
            <div className="mt-1 flex">
                <div className="relative flex items-stretch flex-grow">
                    <div className="text-gray-400 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onInput={e => setInput(e.target.value)}
                        className="block w-full pl-8 sm:text-sm border-gray-300 shadow focus:outline-none focus:ring-0 focus:border-inherit"
                        placeholder={props.placeholder || 'Add Item'}
                        autoComplete="off"
                        autoFocus
                        enterKeyHint="done"
                    />
                    <button
                        type="button"
                        className={classNames(inputValid() ? "hover:bg-gray-100 cursor-pointer" : "text-opacity-20 cursor-not-allowed", "shadow -ml-px relative flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 focus:outline-none focus:ring-0")}
                        disabled={props.disabled || !inputValid()}
                        onClick={onAddItem}
                    >
                        Add
                    </button>
                </div>
            </div>
        </form >
    )
}