import { useEffect, useMemo, useState } from 'react';
import { faArrowLeft, faLeaf } from '@fortawesome/pro-regular-svg-icons';
import { listActions, useList, useListDispatch } from 'context/ListContext';
import { ListTitleInput } from './ListTitleInput';
import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { IconButton } from 'components/IconButton';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import { validateListModel } from './validateListModel';
import { ListIconSelector } from './ListIconSelector';
import { listApi } from 'api';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Returns an object which can be passed to the api containing all of the changes.
 * @param {object} originalList - The original list model.
 * @param {string} newName - The new name value.
 * @param {string} newIconName - The new iconName value.
 * @returns {object}
 */
const getChangesObject = (originalList, newName, newIconName) => {
  const toReturn = {};

  if (originalList.name !== newName) {
    toReturn.name = newName;
  }

  if (originalList.iconName !== newIconName) {
    toReturn.iconName = newIconName;
  }

  return toReturn;
};

/**
 * Drawer which allows the user to edit an existing list.
 * @param {Object} props
 * @param {boolean} props.open - Is the drawer opened or closed?
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed.
 * @param {function} props.onEdit - Callback invoked when the list has been successfully edited.
 */
export const EditListDrawer = ({
  open = false,
  onClose = () => {},
  onEdit = () => {},
}) => {
  const list = useList();
  const dispatch = useListDispatch();
  const [name, setName] = useState(list.name);
  const [iconName, setIconName] = useState(list.iconName);
  const [editError, setEditError] = useState(null);
  const handleError = useErrorHandler();

  // reset internal state when the drawer is closed.
  useEffect(() => {
    if (!open) {
      setName(list.name);
      setIconName(list.iconName);
      setEditError(false);
    }
  }, [open, list]);

  // is the current state a valid one that can be saved?
  const canSave = useMemo(() => {
    if (editError) {
      return false;
    }

    // If no changes have been made, nothing to edit.
    if (name === list.name && iconName === list.iconName) {
      return false;
    }

    return validateListModel(name, iconName);
  }, [editError, name, iconName, list]);

  // hit the api and save the changes to the list.
  const saveChanges = () => {
    if (!canSave) {
      return;
    }

    listApi
      .editList(list.id, getChangesObject(list, name, iconName))
      .then((result) => {
        dispatch({ type: listActions.replace, value: result });
        onEdit();
      })
      .catch((error) => {
        if (error.statusCode === 409) {
          setEditError('A List with that name already exists.');
          return;
        }

        handleError(error);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      <MenuHeader className="!p-4 flex items-center gap-3">
        <IconButton
          icon={faArrowLeft}
          title="Cancel"
          onClick={() => onClose()}
        />
        <MenuTitle>Edit List</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-8 bg-gray-50">
        <ListTitleInput
          value={name}
          error={editError}
          onChange={(value) => {
            setEditError(null);
            setName(value);
          }}
          onEnter={() => canSave && saveChanges()}
        />
        <ListIconSelector iconName={iconName} onChange={setIconName} />
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose} size="lg">
          Cancel
        </Button>
        <Button
          variant="success"
          size="lg"
          disabled={!canSave}
          onClick={saveChanges}
        >
          Save
        </Button>
      </MenuFooter>
    </Drawer>
  );
};
