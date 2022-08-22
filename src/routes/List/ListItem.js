import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import cx from 'classnames';
import { formatDueDate, isDueToday, isOverdue } from 'services/dueDateHelpers';
import { Badge } from 'components/Badge';
import { Transition } from 'components/Transition';
import { ItemCompletedCheckbox } from './Item/ItemCompletedCheckbox';
import { ItemNameLabel } from './Item/ItemNameLabel';

/**
 * Used to compactly display the values of various item properties.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @param {string=} props.className - Additional styles to apply to the component
 */
const ItemIndicator = ({
    icon,
    text,
    className
}) => {
    return (
        <div className={cx("flex items-center gap-1 text-gray-500 text-xs font-medium", className)}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </div>
    )
};

/**
 * Represents an item in a list. Displayed in a ListItemContainer.
 * @param {Object} props
 * @param {object} props.item - The item.
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 * @param {function} props.onItemChange - Callback invoked when the user makes a change to the item.
 */
export const ListItem = ({
    item,
    onClick,
    onItemChange
}) => {
    return (
        <li
            className="flex items-center py-2 px-3 bg-white hover:bg-slate-100 drop-shadow min-h-[50px] rounded cursor-pointer select-none border-gray-300 border"
            onClick={() => onClick(item.id)}
        >
            <ItemCompletedCheckbox
                checked={item.completed}
                onChange={completed => onItemChange({ completed })}
            />
            <span className={cx({ 'opacity-50': item.completed }, 'pl-3 w-full flex flex-col gap-1 items-start')}>
                <span className="w-full flex items-center gap-2">
                    <ItemNameLabel completed={item.completed} name={item.name} className="text-sm md:text-base" />
                    <Transition
                        in={item.quantity > 1}
                        unmountOnExit
                        enter="opacity-0 size-75"
                        enterActive="transition-all !opacity-100 !size-100"
                        exit="opacity-0"
                    >
                        <Badge>{item.quantity}</Badge>
                    </Transition>
                </span>
                <span className="flex items-center gap-2 w-full">
                    {/* Due Date Indicator */}
                    {item.dueDate && (
                        <ItemIndicator
                            icon={faCalendarCheck}
                            text={formatDueDate(item.dueDate)}
                            className={cx({
                                'text-indigo-700': !item.completed && isDueToday(item.dueDate),
                                'text-red-800': !item.completed && isOverdue(item.dueDate)
                            })}
                        />
                    )}
                    {/* Indicator Separator */}
                    <span className="last:hidden first:hidden text-gray-400 text-xs font-medium">{"\u2022"}</span>
                    {/* Note Indicator */}
                    {item.note && <ItemIndicator icon={faNoteSticky} text="Note" />}
                </span>
            </span>
        </li>
    )
};