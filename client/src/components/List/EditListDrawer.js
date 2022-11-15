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
  const originalListValue = useList();
  const dispatch = useListDispatch();
  const [name, setName] = useState(originalListValue.name);
  const [iconName, setIconName] = useState(originalListValue.iconName);
  // const [model, setModel] = useState(originalListValue);

  const canSave = useMemo(() => {
    // If no changes have been made, nothing to edit.
    if (
      name === originalListValue.name &&
      iconName === originalListValue.iconName
    ) {
      return false;
    }

    return validateListModel(name, iconName);
  }, [name, iconName, originalListValue]);

  console.log('original', originalListValue, 'iconName', iconName);

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
          // onEnter={() => canCreateList && createList()}
        />
        <ListIconSelector
          iconName={iconName}
          onChange={(value) => {
            console.log('icon change', value);
            setIconName(value);
          }}
        />
        {/* <ListTitleInput
          value={name}
          error={creationError}
          onChange={(value) => {
            setCreationError(null);
            setName(value);
          }}
          onEnter={() => canCreateList && createList()}
        />
        <ListIconSelector value={icon} onChange={setIcon} icons={icons} /> */}
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center gap-2 flex-shrink-0 justify-end">
        <Button onClick={onClose} size="lg">
          Cancel
        </Button>
        <Button
          variant="success"
          size="lg"
          disabled={!canSave}
          // onClick={createList}
        >
          Save
        </Button>
      </MenuFooter>
    </Drawer>
  );
};
