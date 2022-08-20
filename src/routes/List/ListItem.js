import classNames from 'classnames';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'components/Badge';
import { DueDateStatus } from './Item/DueDateStatus';
import { CompletedCheckbox } from './Item/CompletedCheckbox';
import { NameLabel } from './Item/NameLabel';
import { Status } from './Item/Status';

/**
 * Represents an item in a list. Displayed in a ListItemContainer.
 * @param {Object} props
 * @param {object} props.item - The item.
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 * @param {function} props.onItemChange - Callback invoked when the user makes a change to the item.
 */
export const ListItem = ({
    item,
    onClick,
    onItemChange
}) => {
    return (
        <li
            className="flex items-center py-2 px-3 bg-white hover:bg-slate-100 drop-shadow min-h-[50px] rounded cursor-pointer select-none border-gray-300 border"
            onClick={() => onClick(item.id)}
        >
            <CompletedCheckbox
                checked={item.completed}
                onChange={completed => onItemChange({ completed })}
            />
            <span className={classNames({ 'opacity-50': item.completed }, 'pl-3 w-full flex flex-col gap-1 items-start')}>
                <span className="w-full flex items-center gap-2">
                    <NameLabel completed={item.completed} name={item.name} className="text-sm md:text-base" />
                    {item.quantity > 1 && <Badge content={item.quantity} />}
                </span>
                <span className="flex items-center gap-2 w-full">
                    <DueDateStatus dueDate={item.dueDate} completed={item.completed} />
                    {(item.note && item.dueDate) && <span className="text-gray-400 text-xs font-medium">{"\u2022"}</span>}
                    {item.note && <Status icon={faNoteSticky} text="Note" />}
                </span>
            </span>
        </li>
    )
};