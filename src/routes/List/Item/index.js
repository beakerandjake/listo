import { Item } from './Item';
import { ItemCompletedCheckbox } from './ItemCompletedCheckbox';
import { ItemDueDateMenu } from './ItemDueDateMenu';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';
import { ItemNameInput } from './ItemNameInput'
import { ItemNameLabel } from './ItemNameLabel';
import { ItemNoteInput } from './ItemNoteInput';
import { ItemQuantityMenu } from './ItemQuantityMenu';

export {
    Item,
    ItemCompletedCheckbox,
    ItemDueDateMenu,
    ItemFieldMenuButton,
    ItemNameInput,
    ItemNameLabel,
    ItemNoteInput,
    ItemQuantityMenu
};

// Constants which help determine if an items fields are valid.
const VALIDATION_CONSTANTS = {
    minNameLength: 2,
    maxNameLength: 50,
    maxNoteLength: 500
}

export const itemValidationConstants = { ...VALIDATION_CONSTANTS };