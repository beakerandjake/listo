import { isValid } from "date-fns";
import { itemValidationConstants } from "../Item";
import { AddItem } from "./AddItem";

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

export {
    AddItem,
    DEFAULT_ITEM as defaultItem,
    itemCanBeAdded,
    formatItem
};