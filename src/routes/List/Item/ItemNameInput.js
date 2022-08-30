import { faPencil } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

export const ItemNameInput = ({
    value,
    onChange
}) => {
    // 'min-h-[3.5rem] flex justify-between flex-1 w-full cursor-pointer select-none',
    // 'bg-white hover:bg-slate-100 border-gray-300 border rounded',
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faPencil} fixedWidth className="pl-3 text-gray-400" />
            </div>
            <input
                value={value}
                onChange={e => onChange(e.target.value.trimStart())}
                placeholder="Item Name"
                className={cx(
                    'min-h-[3.5rem] w-full keyboard-only-focus-ring',
                    'rounded border border-gray-300 placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100 pl-14'
                )}

            />
        </div>
    );
};