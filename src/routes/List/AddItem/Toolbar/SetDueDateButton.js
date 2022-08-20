
import { useState } from "react";
import { faCalendarPlus, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import cx from 'classnames';
import { formatDueDate } from "services/dueDateHelpers";
import { AddItemToolbarButton } from "./AddItemToolbar";
import { SetDueDateMenu } from "routes/List/Item";

/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.dueDate - The current due date of the item.
 * @param {function} props.onDueDateChange - Callback invoked when the user changes the due date. 
 */
export function SetDueDateButton({
    dueDate,
    onDueDateChange
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Fires the due date change callback and closes the menu.
    const onDateChange = date => {
        setMenuOpen(false);
        onDueDateChange(date);
    }

    return (
        <SetDueDateMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            dueDate={dueDate}
            onDueDateChange={onDateChange}
            trigger={(
                <AddItemToolbarButton
                    icon={!!dueDate ? faCalendarCheck : faCalendarPlus}
                    title="Add Due Date"
                    text={dueDate && formatDueDate(dueDate)}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={cx({ 'text-indigo-700': !!dueDate })}
                />
            )}
            desktopPlacement='bottom-start'
        />
    )
}