import cx from 'classnames';
import { Badge } from 'components/Badge';
import { ItemCompletedCheckbox } from './ItemCompletedCheckbox';
import { ItemNameLabel } from './ItemNameLabel';
import { ListItemStatusBar } from './ListItemStatusBar';

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
        <div
            className={cx(
                'flex items-center py-2 px-3 min-h-[50px] cursor-pointer select-none',
                'bg-white hover:bg-slate-100 rounded border border-gray-300 shadow'
            )}
            onClick={() => onClick(item.id)}
        >
            <ItemCompletedCheckbox
                checked={item.completed}
                onChange={completed => onItemChange({ completed })}
            />
            <div className={cx({ 'opacity-50': item.completed }, 'pl-3 flex flex-col')}>
                <div className="w-full flex items-center gap-2">
                    <ItemNameLabel completed={item.completed} name={item.name} className="text-sm md:text-base" />
                    {item.quantity > 1 && <Badge>{item.quantity}</Badge>}
                </div>
                <ListItemStatusBar {...item} />
            </div>
        </div>
    )
};