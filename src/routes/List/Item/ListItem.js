import cx from 'classnames';
import { Badge } from 'components/Badge';
import { PopIn, SwitchTransition } from 'components/Transition';
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
            <span className={cx({ 'opacity-50': item.completed }, 'pl-3 w-full flex flex-col gap-1 items-start')}>
                <span className="w-full flex items-center gap-2">
                    <ItemNameLabel completed={item.completed} name={item.name} className="text-sm md:text-base" />
                    <SwitchTransition switchKey={item.quantity} as={PopIn}>
                        {item.quantity > 1 && <Badge>{item.quantity}</Badge>}
                    </SwitchTransition>
                </span>
                <ListItemStatusBar {...item} />
            </span>
        </div>
    )
};