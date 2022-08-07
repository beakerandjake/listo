
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { ToolbarButton } from "./ToolbarButton";
import cx from 'classnames';

export function DueDateButton(props) {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <ToolbarButton
                icon={faCalendarPlus}
                className='bg-white border-gray-300 border shadow-sm'
                title="Add Due Date"
                text="Overdue, Sun, Jul 21"
            />

        </div>
    )
}