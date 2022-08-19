import classNames from 'classnames';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { DueDateStatus } from './DueDateStatus';
import { CompletedCheckbox } from './CompletedCheckbox';
import { NameLabel } from './NameLabel';
import { Status } from './Status';
import { Badge } from 'components/Badge';

export function Item(props) {
    return (
        <li
            className="flex items-center py-2 px-3 bg-white hover:bg-slate-100 drop-shadow min-h-[50px] rounded cursor-pointer select-none border-gray-300 border"
            onClick={() => props.onClickItem(props.id)}
        >
            <CompletedCheckbox
                checked={props.completed}
                onChange={completed => props.onSetItemCompleted(props.id, completed)}
            />
            <span className={classNames({ 'opacity-50': props.completed }, 'pl-3 w-full flex flex-col gap-1 items-start')}>
                <span className="w-full flex items-center gap-2">
                    <NameLabel completed={props.completed} name={props.name} className="text-sm md:text-base" />
                    {props.quantity > 1 && <Badge content={props.quantity} />}
                </span>
                <span className="flex items-center gap-2 w-full">
                    <DueDateStatus dueDate={props.dueDate} completed={props.completed} />
                    {(props.note && props.dueDate) && <span className="text-gray-400 text-xs font-medium">{"\u2022"}</span>}
                    {props.note && <Status icon={faNoteSticky} text="Note" />}
                </span>
            </span>
        </li>
    )
}