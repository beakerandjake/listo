import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function AddItemInput(props) {
    const onKeyDown = e => {
        if (e.key !== 'Enter') {
            return;
        }

        props.onSubmit();
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faPlus} className="text-gray-400 font-thin" />
            </div>
            <input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full pl-14 sm:text-sm border-none min-h-[50px] focus:outline-none focus:ring-0"
                placeholder="Add Item"
                autoComplete="off"
                enterKeyHint="done"
            />
        </div>
    )
}