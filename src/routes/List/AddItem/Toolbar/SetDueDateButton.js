
import { useState } from "react";
import { faCalendarPlus, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { formatDueDate } from "services/formatDueDate";
import { ToolbarButton } from "./ToolbarButton";
import { SetDueDateMenu } from "routes/List/Item";


/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.dueDate - The current due date of the item.
 * @param {function} props.onDueDateChange - Callback invoked when the user changes the due date. 
 */
export function SetDueDateButton({ dueDate, onDueDateChange }) {
    const [menuOpen, setMenuOpen] = useState(false);

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
                <ToolbarButton
                    icon={!!dueDate ? faCalendarCheck : faCalendarPlus}
                    title="Add Due Date"
                    text={dueDate && formatDueDate(dueDate)}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            )}
        />
    )
}