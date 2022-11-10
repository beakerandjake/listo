import { useEffect, useMemo, useState } from 'react';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { IconButton } from 'components/IconButton';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import { SelectListIcon } from './SelectListIcon';
import { icons } from 'services/iconLibrary';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from 'api';
import { TitleInput } from './TitleInput';

const DEFAULT_MODEL = {
  name: '',
  icon: icons[0],
};

const VALIDATION_CONSTANTS = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

const validateModel = (name, icon) => {
  if (
    !name ||
    name.length < VALIDATION_CONSTANTS.nameMinLength ||
    name.length > VALIDATION_CONSTANTS.nameMaxLength
  ) {
    return false;
  }

  if (!icon?.iconName) {
    return false;
  }

  return true;
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
  const [icon, setIcon] = useState(DEFAULT_MODEL.icon);
  const isValid = useMemo(() => validateModel(name, icon), [name, icon]);
  const handleError = useErrorHandler();

  // reset back to default values whenever the drawer closes.
  useEffect(() => {
    if (!open) {
      setName(DEFAULT_MODEL.name);
      setIcon(DEFAULT_MODEL.icon);
    }
  }, [open]);

  // post a new list to the api.
  const createList = () => {
    if (!isValid) {
      return;
    }

    listApi
      .createList({ name, iconName: icon.iconName })
      .then(onListCreated)
      .catch((error) => {
        // handle name conflict.
        if (error.statusCode === 409) {
          console.log('handle conflict todo!');
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
        <TitleInput value={name} onChange={setName} />
        <SelectListIcon value={icon} onChange={setIcon} icons={icons} />
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose} size="lg">
          Cancel
        </Button>
        <Button
          variant="success"
          size="lg"
          disabled={!isValid}
          onClick={createList}
        >
          Create
        </Button>
      </MenuFooter>
    </Drawer>
  );
};

export const listValidationConstants = { ...VALIDATION_CONSTANTS };
