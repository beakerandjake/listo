import { faCalendarCheck, faCalendarPlus } from '@fortawesome/pro-solid-svg-icons';
import { formatDueDate, isOverdue } from 'services/dueDateHelpers';
import { EditItemMenuButton } from './EditItemMenuButton';
import { ItemDueDateMenu } from 'routes/List/Item';

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
        <ItemDueDateMenu
            dueDate={dueDate}
            onDueDateChange={onChange}
            trigger={(
                <EditItemMenuButton
                    icon={dueDate ? faCalendarCheck : faCalendarPlus}
                    placeholder="Add Due Date"
                    clearButtonTitle="Remove Due Date"
                    onClearValue={() => onChange(null)}
                    variant={!dueDate
                        ? 'default'
                        : isOverdue(dueDate) ? 'danger' : 'success'
                    }
                    title="Change Due Date"
                >
                    {!!dueDate && <span>{formatDueDate(dueDate)}</span>}
                </EditItemMenuButton>
            )}
            desktopPlacement="bottom"
            desktopOffset={1}
            desktopSubMenuPlacement="left"
        />
    )
};  