
import { useState } from "react";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import cx from 'classnames';
import { formatDueDate } from "services/formatDueDate";
import { ToolbarButton } from "./ToolbarButton";


export function DueDateButton(props) {
    const [date, setDate] = useState(new Date());


    return (
        <div>
            <ToolbarButton
                icon={faCalendarPlus}
                title="Add Due Date"
                text={date && formatDueDate(date)}
            />

        </div>
    )
}