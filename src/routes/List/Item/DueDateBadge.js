import classNames from 'classnames';
import { format } from 'timeago.js';
import { faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DueDateBadge(props) {
    const parsedDate = Date.parse(props.dueDate);

    if (!parsedDate) {
        return null;
    }

    const overdue = parsedDate < Date.now();
    const formattedDate = format(parsedDate);
    const dynamicStyle = overdue ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800';
    const dynamicIcon = overdue ? faExclamationTriangle : faClock;

    return (
        <span className={classNames(dynamicStyle, 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium')}>
            <FontAwesomeIcon icon={dynamicIcon} />
            {formattedDate}
        </span>
    )
}