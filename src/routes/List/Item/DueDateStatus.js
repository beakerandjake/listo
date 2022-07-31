import classNames from 'classnames';
import { format } from 'timeago.js';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Status } from './Status';

export function DueDateStatus(props) {
    const parsedDate = Date.parse(props.dueDate);

    if (!parsedDate || isNaN(parsedDate)) {
        return null;
    }

    // change the message based on if due in the past or in the future, with special handling for due today.
    const dueToday = new Date(parsedDate).toDateString() === new Date().toDateString()
    const overdue = !dueToday && parsedDate < Date.now();

    const message = dueToday
        ? 'Due Today'
        : (overdue ? 'Overdue, ' : 'Due ') + format(parsedDate);

    return (
        <Status
            icon={faCalendarAlt}
            text={message}
            className={classNames({ 'text-blue-700': !props.completed && dueToday, 'text-red-800': !props.completed && overdue })}
        />
    )
}