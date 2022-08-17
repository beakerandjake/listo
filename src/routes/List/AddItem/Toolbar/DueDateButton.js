
import { useState } from "react";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { formatDueDate } from "services/formatDueDate";
import { ToolbarButton } from "./ToolbarButton";
import { SetDueDateMenu } from "routes/List/Item";


export function DueDateButton(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const onDateChange = date => {
        setMenuOpen(false);
        props.onDueDateChange(date);
    }

    const button = (
        <ToolbarButton
            icon={faCalendarPlus}
            title="Add Due Date"
            text={props.dueDate && formatDueDate(props.dueDate)}
            onClick={() => setMenuOpen(!menuOpen)}
        />
    );

    return (
        <div>
            <SetDueDateMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                dueDate={props.dueDate}
                onDueDateChange={onDateChange}
                trigger={button}
            />
        </div>
    )
}