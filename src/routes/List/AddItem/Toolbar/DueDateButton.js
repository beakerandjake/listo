
import { useState } from "react";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { formatDueDate } from "services/formatDueDate";
import { ToolbarButton } from "./ToolbarButton";
import { DueDateDropdown } from "./DueDateDropdown";


export function DueDateButton(props) {
    const [date, setDate] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const onDateChosen = date => {
        console.log('on date chosen', date);
        setMenuOpen(false);
        setDate(date);
    }

    const button = (
        <ToolbarButton
            icon={faCalendarPlus}
            title="Add Due Date"
            text={date && formatDueDate(date)}
            onClick={() => setMenuOpen(!menuOpen)}
        />
    );

    return (
        <div>


            <DueDateDropdown
                trigger={button}
                open={menuOpen}
                onOpenChange={setMenuOpen}
                onDateChosen={onDateChosen}
            />
        </div>
    )
}