import { useEffect, useMemo, useState } from 'react';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from 'api';
import { icons } from 'services/iconLibrary';
import { validateListModel } from './validateListModel';
import { ListIconSelector } from './ListIconSelector';
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

// default values for the list fields when the drawer is first opened.
const DEFAULT_MODEL = {
  name: '',
  iconName: icons[0]?.iconName,
};

/**
 * Drawer which allows the user to create a new list.
 * @param {Object} props
 * @param {boolean} props.open - Is the drawer opened or closed?
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed.
 * @param {function} props.onListCreated - Callback invoked when the list is successfully created.
 */
export const CreateListDrawer = ({
  open = false,
  onClose = () => {},
  onListCreated = () => {},
}) => {
  const [name, setName] = useState(DEFAULT_MODEL.name);
  const [iconName, setIconName] = useState(DEFAULT_MODEL.iconName);
  const [creationError, setCreationError] = useState(null);
  const handleError = useErrorHandler();

  // flag to indicate if the list is in a valid state to be posted.
  const canCreateList = useMemo(
    () => !creationError && validateListModel(name, iconName),
    [creationError, name, iconName]
  );

  // reset back to default values whenever the drawer closes.
  useEffect(() => {
    if (!open) {
      setName(DEFAULT_MODEL.name);
      setIconName(DEFAULT_MODEL.iconName);
      setCreationError(null);
    }
  }, [open]);

  // post a new list to the api.
  const createList = () => {
    if (!canCreateList) {
      return;
    }

    listApi
      .createList({ name, iconName })
      .then(onListCreated)
      .catch((error) => {
        // handle name conflict.
        if (error.statusCode === 409) {
          setCreationError('A List with that name already exists.');
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
        <MenuTitle>Create New List</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-8 bg-gray-50">
        <ListTitleInput
          value={name}
          error={creationError}
          onChange={(value) => {
            setCreationError(null);
            setName(value);
          }}
          onEnter={() => canCreateList && createList()}
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
          disabled={!canCreateList}
          onClick={createList}
        >
          Create
        </Button>
      </MenuFooter>
    </Drawer>
  );
};
