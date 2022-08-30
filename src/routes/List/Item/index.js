import { ItemCompletedCheckbox } from './ItemCompletedCheckbox';
import { ItemDueDateMenu } from './ItemDueDateMenu';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';
import { ItemNameLabel } from './ItemNameLabel';
import { ItemQuantityMenu } from './ItemQuantityMenu';

export {
    ItemCompletedCheckbox,
    ItemDueDateMenu,
    ItemFieldMenuButton,
    ItemNameLabel,
    ItemQuantityMenu,
};

// Constants which help determine if an items fields are valid.
const VALIDATION_CONSTANTS = {
    minNameLength: 2,
    maxNameLength: 50,
    maxNoteLength: 500
}

export const itemValidationConstants = { ...VALIDATION_CONSTANTS };