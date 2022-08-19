import classNames from 'classnames';
import { faCalendar, faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { Status } from './Status';
import { formatDueDate } from 'services/dueDateHelpers';

export function DueDateStatus(props) {
    if (!props.dueDate) {
        return null;
    }

    const formattedDueDate = formatDueDate(props.dueDate);
    const today = formattedDueDate.includes('Today');
    const overdue = formattedDueDate.includes('Overdue');

    return (
        <Status
            icon={faCalendarCheck}
            text={formattedDueDate}
            className={classNames({ 'text-blue-700': !props.completed && today, 'text-red-800': !props.completed && overdue })}
        />
    )
}