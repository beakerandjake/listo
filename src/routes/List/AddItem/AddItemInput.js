import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { forwardRef } from 'react';

/**
 * Input field which allows the user to set the name of the Item.
 * @param {object} props - the props
 * @param {string} props.value - The current item name.
 * @param {function} props.onChange - Fired when the user changes the name value.
 * @param {function} props.onSubmit - Fired when the user presses the enter key. 
 * @param {function} props.onFocus - Fired when the input element gains focus.
 **/
export const AddItemInput = forwardRef(({
    value,
    onChange,
    onSubmit,
    onFocus
}, ref) => {
    const onKeyDown = e => {
        if (e.key !== 'Enter') {
            return;
        }

        onSubmit();
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faPlus} className="text-green-700 font-thin" />
            </div>
            <input
                ref={ref}
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={() => onFocus()}
                className="w-full pl-14 sm:text-sm border-none min-h-[50px] focus:outline-none focus:ring-0"
                placeholder="Add Item"
                autoComplete="off"
                enterKeyHint="done"
            />
        </div>
    )
});