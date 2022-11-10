import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import { useEffect, useMemo, useRef, useState } from 'react';
import { icons } from 'services/iconLibrary';
import { SelectListIcon } from './SelectListIcon';

const DEFAULT_MODEL = {
  name: '',
  icon: icons[0],
};

const validationConstants = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

const validateModel = (name, icon) => {
  if (
    !name ||
    name.length < validationConstants.nameMinLength ||
    name.length > validationConstants.nameMaxLength
  ) {
    return false;
  }

  if (!icon?.iconName) {
    return false;
  }

  return true;
};

export const CreateListDrawer = ({ open = false, onClose = () => {} }) => {
  const [name, setName] = useState(DEFAULT_MODEL.name);
  const [icon, setIcon] = useState(DEFAULT_MODEL.icon);
  const isValid = useMemo(() => validateModel(name, icon), [name, icon]);

  // Reset back to default values whenever the drawer closes.
  useEffect(() => {
    if (!open) {
      setName(DEFAULT_MODEL.name);
      setIcon(DEFAULT_MODEL.icon);
    }
  }, [open]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      <MenuHeader className="!p-4">
        <MenuTitle>Create New List</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-8 bg-gray-50">
        {/* List Name */}
        <div>
          <label className="block text-md font-medium text-gray-700">
            Title
          </label>
          <div className="mt-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm keyboard-only-focus-ring sm:text-sm"
              autoComplete="off"
              enterKeyHint="done"
              minLength={validationConstants.nameMinLength}
              maxLength={validationConstants.nameMaxLength}
            />
          </div>
        </div>
        {/* List Icon */}
        <SelectListIcon value={icon} onChange={setIcon} icons={icons} />
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="success" disabled={!isValid}>
          Create
        </Button>
      </MenuFooter>
    </Drawer>
  );
};
