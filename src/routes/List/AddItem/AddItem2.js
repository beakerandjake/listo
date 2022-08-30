import { useState } from 'react';
import { isValid } from 'date-fns';
import MediaQuery from 'react-responsive';
import { mobileBreakpoint } from "components/ResponsiveLayout";
import { itemValidationConstants } from 'routes/List/Item';
import { AddItemDrawer } from './AddItemDrawer';
import { AddItemToolbar } from './Toolbar';

const DEFAULT_ITEM = {
    name: '',
    dueDate: null,
    quantity: 1,
    note: ''
};

/**
 * Are all the fields of the item valid? 
 * @param {Object} item - The item to validate
 */
const itemCanBeAdded = ({ name, dueDate, quantity, note }) => {
    if (!name || name.length < itemValidationConstants.minNameLength || name.length > itemValidationConstants.maxNameLength) {
        return false;
    }

    if (dueDate && !isValid(dueDate)) {
        return false;
    }

    if (quantity < 0) {
        return false;
    }

    if (note && note.length > itemValidationConstants.maxNoteLength) {
        return false;
    }

    return true;
};

/**
 * Applies consistent formatting to the item's fields.
 * @param {Object} item - The item to be format
 */
const formatItem = (item) => {
    const sanitized = {
        name: item.name.trim(),
        note: item.note?.trim() || ''
    };

    return { ...item, ...sanitized };
}

/**
 * Allows the user to add a new Item to the list.
 * @param {object} props - the props
 * @param {function} props.onAddItem - Callback invoked when the user wants to add a new Item to the list.
 **/
export const AddItem = ({ onAddItem }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [item, setItem] = useState(DEFAULT_ITEM);

    const itemIsValid = itemCanBeAdded(formatItem(item));

    // Callback invoked whenever the user makes changes to the item.
    const onItemChange = (changes) => {
        setItem({ ...item, ...changes });
    };

    // Will only invoke our onAddItem callback if the item is valid.
    const tryToAddItem = () => {
        if (!itemIsValid) {
            return;
        }

        setDrawerOpen(false);
        onAddItem(formatItem(item));
    };

    return (
        <>
            {/* Static Toolbar on Desktop. */}
            <MediaQuery minWidth={mobileBreakpoint}>
                <AddItemToolbar
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    item={item}
                    itemIsValid={itemIsValid}
                    onItemChange={onItemChange}
                    onAddItem={tryToAddItem}
                />
            </MediaQuery>
            {/* Floating Action Button / Drawer on Mobile */}
            <MediaQuery maxWidth={mobileBreakpoint - 1}>
                <AddItemDrawer
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    onCloseTransitionComplete={() => setItem(DEFAULT_ITEM)}
                    item={item}
                    itemIsValid={itemIsValid}
                    onItemChange={onItemChange}
                    onAddItem={tryToAddItem}
                />
            </MediaQuery>
        </>
    );
};