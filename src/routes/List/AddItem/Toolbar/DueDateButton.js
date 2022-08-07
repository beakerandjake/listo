
import { useState } from "react";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { formatDueDate } from "services/formatDueDate";
import { ToolbarButton } from "./ToolbarButton";
import { DueDateDropdown } from "./DueDateDropdown";


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
            <DueDateDropdown
                trigger={button}
                open={menuOpen}
                onOpenChange={setMenuOpen}
                dueDate={props.dueDate}
                onDateChange={onDateChange}
                showClearButton={!!props.dueDate}
            />
        </div>
    )
}