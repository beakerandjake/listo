import { useState } from "react";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { ToolbarButton } from "./ToolbarButton";


/**
 * Toolbar button which exposes a menu to set the Due Date of the item.
 * @param {Object} props
 * @param {date} props.dueDate - The current due date of the item.
 * @param {function} props.onDueDateChange - Callback invoked when the user changes the due date. 
 */
export function SetQuantityButton({ quantity, onQuantityChange }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // const onDateChange = date => {
    //     setMenuOpen(false);
    //     onDueDateChange(date);
    // }

    // return (
    //     <SetDueDateMenu
    //         open={menuOpen}
    //         onClose={() => setMenuOpen(false)}
    //         dueDate={dueDate}
    //         onDueDateChange={onDateChange}
    //         trigger={(
    //             <ToolbarButton
    //                 icon={!!dueDate ? faCalendarCheck : faCalendarPlus}
    //                 title="Add Due Date"
    //                 text={dueDate && formatDueDate(dueDate)}
    //                 onClick={() => setMenuOpen(!menuOpen)}
    //             />
    //         )}
    //     />
    // )

    return (
        <ToolbarButton
            icon={faPlusMinus}
            title="Change Quantity"
            text={quantity > 1 && quantity}
            onClick={() => setMenuOpen(!menuOpen)}
        />
    )
}