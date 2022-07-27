import classNames from 'classnames';
import { DeleteButton } from './DeleteButton';

export function Item(props) {
    const toggleCompleted = () => {
        props.onSetItemCompleted(props.id, !props.completed);
    }

    return (
        <li className="flex items-center py-2">
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
            <p className={classNames('px-2 w-full cursor-pointer', { 'line-through opacity-50': props.completed })} onClick={toggleCompleted}>
                {props.name}
            </p>
            <span className="grow-0 flex justify-between items-center gap-3">
                {/* <DeleteButton /> */}
                <DeleteButton />
            </span>
        </li>
    )
}