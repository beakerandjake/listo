import { ItemCompletedCheckbox } from './ItemCompletedCheckbox';
import { ItemNameLabel } from './ItemNameLabel';
import { ItemDueDateMenu } from './ItemDueDateMenu';
import { ItemQuantityMenu } from './ItemQuantityMenu';

export {
    ItemCompletedCheckbox,
    ItemNameLabel,
    ItemDueDateMenu,
    ItemQuantityMenu,
};

// Constants which help determine if an items fields are valid.
const VALIDATION_CONSTANTS = {
    minNameLength: 2,
    maxNameLength: 50,
    maxNoteLength: 500
}

export const itemValidationConstants = { ...VALIDATION_CONSTANTS };