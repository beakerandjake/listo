
import { useState } from "react";
import { faCalendarPlus, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import cx from 'classnames';
import { formatDueDate } from "services/dueDateHelpers";
import { ToolbarButton } from "./ToolbarButton";
import { SetDueDateMenu } from "routes/List/Item";


/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.dueDate - The current due date of the item.
 * @param {function} props.onDueDateChange - Callback invoked when the user changes the due date. 
 * @param {function} props.onMenuOpenChange - Callback invoked when the user opens or closes the menu. 

 */
export function SetDueDateButton({
    dueDate,
    onDueDateChange,
    onMenuOpenChange
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Opens or closes the menu and notifies anyone interested.
    const setMenuOpenAndNotify = open => {
        setMenuOpen(open);
        onMenuOpenChange(open);
    };

    // Fires the due date change callback and closes the menu.
    const onDateChange = date => {
        setMenuOpenAndNotify(false);
        onDueDateChange(date);
    }


    return (
        <SetDueDateMenu
            open={menuOpen}
            onClose={() => setMenuOpenAndNotify(false)}
            dueDate={dueDate}
            onDueDateChange={onDateChange}
            trigger={(
                <ToolbarButton
                    icon={!!dueDate ? faCalendarCheck : faCalendarPlus}
                    title="Add Due Date"
                    text={dueDate && formatDueDate(dueDate)}
                    onClick={() => setMenuOpenAndNotify(!menuOpen)}
                    className={cx({ 'text-indigo-700': !!dueDate })}
                />
            )}
            desktopPlacement='bottom-start'
        />
    )
}