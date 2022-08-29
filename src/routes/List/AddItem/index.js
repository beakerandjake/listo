import { isValid } from "date-fns";
import { AddItem } from "./AddItem";
import { FocusOnAddItemButton } from "./FocusOnAddItemButton";

const DEFAULT_ITEM = {
    name: '',
    dueDate: null,
    quantity: 1,
    note: null
};

const MIN_NAME_LENGTH = 2;
const MAX_NOTE_LENGTH = 500;

/**
 * Are all the fields of the item valid? 
 * @param {Object} props
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.placeholder - The text to render if no children are provided.
 * @param {'default'|'success'|'danger'} props.variant - The variant style of the button.
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 * @param {function} props.onClearValue - Callback invoked when the user clicks the clear button.
 * @param {string} props.clearButtonTitle - The title to display when hovering the clear button.
 * @param {React.ReactNode} props.children - The child element.  
 */
const itemCanBeAdded = ({ name, dueDate, quantity, note }) => {
    if (!name || name.length < MIN_NAME_LENGTH) {
        return false;
    }

    if (dueDate && !isValid(dueDate)) {
        return false;
    }

    if (quantity < 0) {
        return false;
    }

    if (note && note.length > MAX_NOTE_LENGTH) {
        return false;
    }

    return true;
};

export {
    AddItem,
    FocusOnAddItemButton as FocusAddItemFloatingButton,
    DEFAULT_ITEM as defaultItem,
    itemCanBeAdded
};