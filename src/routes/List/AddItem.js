import { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function AddItem(props) {
    const [input, setInput] = useState('');

    return (
        <form className="w-full">
            <div className="relative w-full">
                <input
                    type="text"
                    value={input}
                    onInput={e => setInput(e.target.value)}
                    className="shadow appearance-none border-gray-200 w-full text-gray-700 focus:outline-none focus:ring-0 focus:border-inherit"
                    placeholder={props.placeholder || 'What do we need?'}
                    autoComplete="off"
                    autoFocus
                    enterKeyHint="done"
                />
                <div className="text-green-700 absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <FontAwesomeIcon icon={faPlus} className={classNames({'opacity-25 cursor-default': input.length < 2})} />
                </div>
            </div>
        </form>
    )
}