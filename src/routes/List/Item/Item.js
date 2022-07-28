import classNames from 'classnames';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from 'components/IconButton';
import { QuantityBadge } from './QuantityBadge';
import { DueDateBadge } from './DueDateBadge';

export function Item(props) {
    const toggleCompleted = () => {
        props.onSetItemCompleted(props.id, !props.completed);
    }

    return (
        <li className="flex items-center py-2 gap-2">
            {/* Completed Checkbox */}
            <span className="flex items-center h-5 grow-0">
                <input
                    type="checkbox"
                    className="focus:ring-green-500 w-4 h-4 text-green-700 border-gray-300 rounded cursor-pointer"
                    checked={props.completed}
                    onChange={toggleCompleted}
                />
            </span>
            {/* Item Label */}
            <span className={classNames('w-full cursor-pointer flex items-center gap-2', { 'opacity-50': props.completed })} onClick={toggleCompleted}>
                <p className={classNames({ 'line-through': props.completed })}>{props.name}</p>
                <QuantityBadge quantity={props.quantity} />
                <DueDateBadge dueDate={props.dueDate} />
            </span>
            <span className="grow-0 flex justify-between items-center gap-3">
                <IconButton disabled={props.disabled} icon={faPencil} title="Edit Item" />
                <IconButton onClick={() => props.onDelete(props.id)} disabled={props.disabled} icon={faTrashAlt} title="Delete Item" />
            </span>
        </li>
    )
}