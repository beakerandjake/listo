import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RadioGroup } from '@headlessui/react';
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
import { icons } from 'services/iconLibrary';
import cx from 'classnames';

const validationConstants = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

export const CreateListDrawer = ({ open = false, onClose = () => {} }) => {
  // min 3 max 50
  // todo react-hook-form

  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);


  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      <MenuHeader className="md:p-5">
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
        {/* Icon */}
        <RadioGroup value={icon} onChange={setIcon}>
          <RadioGroup.Label className="block text-md font-medium text-gray-700">
            Icon
          </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 mt-2 select-none">
            {icons.map((x) => (
              <RadioGroup.Option key={x.iconName} value={x.iconName}>
                {({ active, checked }) => (
                  <div
                    className={cx(
                      active ? 'ring-2 ring-offset-2 ring-green-600' : '',
                      checked
                        ? 'bg-green-700 border-transparent text-white hover:bg-green-800'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                      'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center'
                    )}
                  >
                    <FontAwesomeIcon icon={x} size="lg" fixedWidth />
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="success">Create</Button>
      </MenuFooter>
    </Drawer>
  );
};
