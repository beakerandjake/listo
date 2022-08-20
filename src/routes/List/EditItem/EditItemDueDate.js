import { faCalendarDay, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { formatDueDate, isOverdue } from 'services/dueDateHelpers';
import { SetDueDateMenu } from '../Item';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';

/**
 * An ItemFieldMenuButton that allows the user to view / edit the item due date.
 * @param {Object} props - The Props.
 * @param {date} props.dueDate - The current due date.
 * @param {function} props.onChange - Callback fired when the due date changes
 */
export const EditItemDudeDate = ({
    dueDate, onChange
}) => {
    return (
        <SetDueDateMenu
            dueDate={dueDate}
            onDueDateChange={onChange}
            trigger={(
                <ItemFieldMenuButton
                    icon={dueDate ? faCalendarDay : faCalendarPlus}
                    placeholder="Add Due Date"
                    clearButtonTitle="Remove Due Date"
                    onClearValue={() => onChange(null)}
                    variant={!dueDate
                        ? 'default'
                        : isOverdue(dueDate) ? 'danger' : 'success'
                    }
                >
                    {!!dueDate && <span>{formatDueDate(dueDate)}</span>}
                </ItemFieldMenuButton>
            )}
            desktopPlacement="bottom"
            desktopOffset={1}
            desktopSubMenuPlacement="left"
        />
    )
};  