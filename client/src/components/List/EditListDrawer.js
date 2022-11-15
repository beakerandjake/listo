import { useMemo, useState } from 'react';
import { faArrowLeft, faLeaf } from '@fortawesome/pro-regular-svg-icons';
import { useList, useListDispatch } from 'context/ListContext';
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

export const EditListDrawer = ({ open, onClose }) => {
  const list = useList();
  const dispatch = useListDispatch();
  const [name, setName] = useState(list.name);
  const [iconName, setIconName] = useState(list.iconName);

  const canSave = useMemo(() => {
    // If no changes have been made, nothing to edit.
    if (name === list.name && iconName === list.iconName) {
      return false;
    }

    return validateListModel(name, iconName);
  }, [name, iconName, list]);

  const saveChanges = () => {
    if (!canSave) {
      return;
    }

    console.log('saving changes!');
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
          // error={creationError}
          onChange={(value) => {
            // setCreationError(null);
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
