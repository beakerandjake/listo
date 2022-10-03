import { useState } from 'react';
import MediaQuery from 'react-responsive';
import { mobileBreakpoint } from 'components/ResponsiveLayout';
import { itemValidationConstants } from 'routes/List/Item';
import { AddItemDrawer } from './AddItemDrawer';
import { AddItemToolbar } from './AddItemToolbar';
import { StatefulMenu } from 'components/Menu';
import { isValidDate } from 'services/dueDateHelpers';

const DEFAULT_ITEM = {
  name: '',
  dueDate: null,
  quantity: 1,
  note: '',
};

/**
 * Are all the fields of the item valid?
 * @param {Object} item - The item to validate
 */
const itemCanBeAdded = ({ name, dueDate, quantity, note }) => {
  if (
    !name ||
    name.length < itemValidationConstants.minNameLength ||
    name.length > itemValidationConstants.maxNameLength
  ) {
    return false;
  }

  if (dueDate && !isValidDate(dueDate)) {
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
 * @param {object} item - The item to be format
 * @returns {object}
 */
const formatItem = (item) => {
  const sanitized = {
    name: item.name.trim(),
    note: item.note?.trim() || null,
    dueDate: item.dueDate?.toISOString() || null,
  };

  return { ...item, ...sanitized };
};

/**
 * Allows the user to add a new Item to the list.
 * @param {object} props - the props
 * @param {function} props.onAddItem - Callback invoked when the user wants to add a new Item to the list.
 **/
export const AddItem = ({ onAddItem }) => {
  const [item, setItem] = useState(DEFAULT_ITEM);

  const itemIsValid = itemCanBeAdded(formatItem(item));

  // Callback invoked whenever the user makes changes to the item.
  const onItemChange = (changes) => {
    setItem({ ...item, ...changes });
  };

  // Will only invoke our onAddItem callback if the item is valid.
  const tryToAddItem = () => {
    if (!itemIsValid) {
      return false;
    }

    onAddItem(formatItem(item));
    return true;
  };

  return (
    <>
      {/* Static Toolbar on Desktop. */}
      <MediaQuery minWidth={mobileBreakpoint}>
        <AddItemToolbar
          item={item}
          itemIsValid={itemIsValid}
          onItemChange={onItemChange}
          onAddItem={() => {
            tryToAddItem() && setItem(DEFAULT_ITEM);
          }}
        />
      </MediaQuery>
      {/* Floating Action Button / Drawer on Mobile */}
      <MediaQuery maxWidth={mobileBreakpoint - 1}>
        <StatefulMenu>
          {({ open, setOpen }) => (
            <AddItemDrawer
              open={open}
              onOpenChange={setOpen}
              onCloseTransitionComplete={() => setItem(DEFAULT_ITEM)}
              item={item}
              itemIsValid={itemIsValid}
              onItemChange={onItemChange}
              onAddItem={() => {
                tryToAddItem() && setOpen(false);
              }}
            />
          )}
        </StatefulMenu>
      </MediaQuery>
    </>
  );
};

export const defaultItem = { ...DEFAULT_ITEM };
