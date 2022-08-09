import { useState } from 'react';
import { AddItemInput } from './AddItemInput';
import { AddItemToolbar } from './Toolbar/AddItemToolbar';

const defaultItem = {
    name: '',
    dueDate: null,
    quantity: 1
}

export function AddItem(props) {
    const [item, setItem] = useState(defaultItem);
    const nameValid = item.name && item.name.length > 1;

    const onItemChange = changes => {
        setItem({ ...item, ...changes });
    };

    const onAddItem = () => {
        if (!nameValid || props.disabled) {
            return;
        }

        props.onAddItem(item);
        setItem(defaultItem);
    };

    return (
        <div className="rounded border border-gray-200">
            <AddItemInput value={item.name} onChange={name => onItemChange({ name })} onSubmit={onAddItem} />
            <AddItemToolbar
                item={item}
                onItemChange={onItemChange}
                canAddItem={nameValid}
                onAddItem={onAddItem}
            />
        </div>
    )
}