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
        <li className="flex items-center py-2 px-3 bg-white shadow h-[50px] rounded cursor-pointer">
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
            <span className={classNames('pl-3 w-full  flex items-center gap-2', { 'opacity-50': props.completed })}>
                <p className={classNames({ 'line-through': props.completed })}>{props.name}</p>
                <QuantityBadge quantity={props.quantity} />
                <DueDateBadge dueDate={props.dueDate} />
            </span>
        </li>
    )
}