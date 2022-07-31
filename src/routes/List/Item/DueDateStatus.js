import classNames from 'classnames';
import { format } from 'timeago.js';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Status } from './Status';

export function DueDateStatus(props) {
    const parsedDate = Date.parse(props.dueDate);

    if (!parsedDate || isNaN(parsedDate)) {
        return null;
    }

    const formattedDate = format(parsedDate);

    const overdue = parsedDate < Date.now();
    const prefix = overdue ? 'Overdue, ' : 'Due ';

    return (
        <Status icon={faCalendarAlt} text={prefix + formattedDate} className={classNames({ 'text-red-800': !props.completed && overdue })} />
    )
}