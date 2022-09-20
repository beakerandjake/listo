import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faNoteSticky } from "@fortawesome/pro-light-svg-icons";
import cx from 'classnames';
import { formatDueDate, isDueToday, isOverdue } from "services/dueDateHelpers";

/**
 * Compactly displays the values of various item properties.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @param {string=} props.className - Additional styles to apply to the component
 */
const StatusField = ({
    icon,
    text,
    className
}) => {
    return (
        <div className={cx("flex items-center gap-1 text-gray-500 text-xs font-medium", className)}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </div>
    )
};

/**
 * StatusField which displays the Items due date (if any).
 * @param {Object} props
 * @param {Date} props.dueDate - The Items due date.
 * @param {boolean} props.completed - Has the item been completed?
 */
const DueDateStatusField = ({
    dueDate,
    completed
}) => {
    if (!dueDate) {
        return null;
    }

    return (
        <StatusField
            icon={faCalendarCheck}
            text={formatDueDate(dueDate)}
            className={cx({
                'text-indigo-700': !completed && isDueToday(dueDate),
                'text-red-800': !completed && isOverdue(dueDate)
            })}
        />
    );
}


/**
 * Displays various fields of the item if they are present.
 * @param {Object} props
 * @param {Object} props.item - The Item whose fields to display.
 */
export const ListItemStatusBar = ({
    note,
    dueDate,
    completed
}) => {
    // Nothing to display if status fields are null.
    if (!note && !dueDate) {
        return null;
    }

    return (
        <span className="flex items-center gap-2 w-full">
            {/* Has Due Date Status Field */}
            <DueDateStatusField completed={completed} dueDate={dueDate} />
            {/* Status Separator */}
            <span className="last:hidden first:hidden text-gray-400 text-xs font-medium">{"\u2022"}</span>
            {/* Has Note Status Field */}
            {note && <StatusField icon={faNoteSticky} text="Note" />}
        </span>
    );
};