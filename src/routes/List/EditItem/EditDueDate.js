import { faCalendarDay, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { formatDueDate, isOverdue } from 'services/dueDateHelpers';
import { SetDueDateMenu } from '../Item';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';

/**
 * Allows the user to set or edit the due date and displays the current due date (if any)
 * @param {Object} props - The Props.
 * @param {date} props.dueDate - The current due date.
 * @param {function} props.onChange - Callback fired when the due date changes
 */
export const EditDueDate = ({
    dueDate, onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const setDueDateAndCloseMenu = value => {
        setIsOpen(false);
        onChange(value);
    };

    return (
        <SetDueDateMenu
            open={isOpen}
            onClose={() => setIsOpen(false)}
            dueDate={dueDate}
            onDueDateChange={setDueDateAndCloseMenu}
            trigger={(
                <ItemFieldMenuButton
                    icon={dueDate ? faCalendarDay : faCalendarPlus}
                    placeholder="Add Due Date"
                    clearButtonTitle="Remove Due Date"
                    onClick={() => setIsOpen(true)}
                    onClearValue={() => setDueDateAndCloseMenu(null)}
                    variant={!dueDate
                        ? 'default'
                        : isOverdue(dueDate) ? 'danger' : 'success'
                    }
                >
                    {!!dueDate && (
                        <span>{formatDueDate(dueDate)}</span>
                    )}
                </ItemFieldMenuButton>
            )}
            desktopPlacement='bottom'
            desktopOffset={1}
        />
    )
};  