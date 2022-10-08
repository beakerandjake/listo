import { useMemo, useState } from 'react';
import MediaQuery from 'react-responsive';
import { mobileBreakpoint } from 'components/ResponsiveLayout';
import { itemValidationConstants } from 'routes/List/Item';
import { AddItemDrawer } from './AddItemDrawer';
import { AddItemToolbar } from './AddItemToolbar';
import { StatefulMenu } from 'components/Menu';
import { isValidDate } from 'services/dueDateHelpers';
import { itemApi } from 'api';
import {
  listItemsActions,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { useErrorHandler } from 'react-error-boundary';

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
 * @param {number} props.listId - The id of the list to add items to.
 **/
export const AddItem = ({ listId }) => {
  const [item, setItem] = useState(DEFAULT_ITEM);
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  // is the item in a state where it can be added? re-calculated any time item changes.
  const itemIsValid = useMemo(() => itemCanBeAdded(formatItem(item)), [item]);

  // update the item with the changes.
  const applyChanges = (changes) => {
    setItem({ ...item, ...changes });
  };

  /**
   * Adds the item to the list.
   * @returns {Promise}
   */
  const addItem = () =>
    itemApi
      .addItem(listId, formatItem(item))
      .then((result) => dispatch({ type: listItemsActions.add, item: result }))
      .catch(handleError);

  return (
    <>
      {/* Static Toolbar on Desktop. */}
      <MediaQuery minWidth={mobileBreakpoint}>
        <AddItemToolbar
          item={item}
          itemIsValid={itemIsValid}
          onItemChange={applyChanges}
          onAddItem={() => {
            itemIsValid && addItem();
            setItem(DEFAULT_ITEM);
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
              onItemChange={applyChanges}
              onAddItem={() => {
                itemIsValid && addItem();
                setOpen(false);
              }}
            />
          )}
        </StatefulMenu>
      </MediaQuery>
    </>
  );
};
