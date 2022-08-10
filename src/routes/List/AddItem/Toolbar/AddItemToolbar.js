import * as Toolbar from '@radix-ui/react-toolbar';
import { Button } from 'components/Button';
import { QuantityButton } from 'routes/List/Item/QuantityButton';
import { DueDateButton } from './DueDateButton';

export const AddItemToolbarButton = Toolbar.Button;

export function AddItemToolbar(props) {
    return (
        <Toolbar.Root className="px-3 py-2 bg-gray-100 rounded-b flex items-center justify-between">
            <div className="flex items-center gap-3">
                <DueDateButton dueDate={props.item.dueDate} onDueDateChange={dueDate => props.onItemChange({ dueDate })} />
                <QuantityButton quantity={props.item.quantity} onQuantityChange={quantity => props.onItemChange({ quantity })} />
            </div>

            <Toolbar.Button asChild>
                <Button
                    text="Add"
                    size="sm"
                    disabled={!props.canAddItem}
                    onClick={props.onAddItem}
                />
            </Toolbar.Button>
        </Toolbar.Root>

    )
}