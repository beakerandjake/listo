import classNames from 'classnames';
import { QuantityBadge } from './QuantityBadge';
import { DueDateBadge } from './DueDateBadge';
import { CompletedCheckbox } from './CompletedCheckbox';
import { NameLabel } from './NameLabel';

export function Item(props) {
    return (
        <li
            className="flex items-center py-2 px-3 bg-white hover:bg-slate-100 shadow h-[50px] rounded cursor-pointer"
            onClick={() => props.onClickItem(props.id)}
        >
            <CompletedCheckbox
                checked={props.completed}
                onChange={completed => props.onSetItemCompleted(props.id, completed)}
            />
            <span className={classNames('pl-3 w-full flex items-center gap-2', { 'opacity-50': props.completed })}>
                <NameLabel completed={props.completed} name={props.name} className="text-sm md:text-base"/>
                <QuantityBadge quantity={props.quantity} />
                <DueDateBadge dueDate={props.dueDate} />
            </span>
        </li>
    )
}