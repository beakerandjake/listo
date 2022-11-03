import { Item } from './Item';
import { ItemDueDateMenu } from './ItemDueDateMenu';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';
import { ItemNameInput } from './ItemNameInput';
import { ItemNoteInput } from './ItemNoteInput';
import { ItemQuantityMenu } from './ItemQuantityMenu';
import { ItemFormattedDateLabel } from './ItemFormattedDateLabel';

export {
  Item,
  ItemDueDateMenu,
  ItemFieldMenuButton,
  ItemNameInput,
  ItemNoteInput,
  ItemQuantityMenu,
  ItemFormattedDateLabel,
};

// Constants which help determine if an items fields are valid.
const VALIDATION_CONSTANTS = {
  minNameLength: 2,
  maxNameLength: 50,
  maxNoteLength: 500,
};

export const itemValidationConstants = { ...VALIDATION_CONSTANTS };
