import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { IconButton } from 'components/IconButton';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import { useState } from 'react';

const validationConstants = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

export const CreateListDrawer = ({ open = false, onClose = () => {} }) => {
  // min 3 max 50

  const [name, setName] = useState('');

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      <MenuHeader className="md:p-4">
        <MenuTitle>Create New List</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-3 bg-gray-50">
        {/* List Name */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              List Title
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
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="success">Create</Button>
      </MenuFooter>
    </Drawer>
  );
};
