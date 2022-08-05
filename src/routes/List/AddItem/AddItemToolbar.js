import * as Toolbar from '@radix-ui/react-toolbar';
import { Button } from 'components/Button';
import { DueDateDropdown } from './DueDateDropdown';

export const AddItemToolbarButton = Toolbar.Button;

export function AddItemToolbar(props) {
    return (
        <Toolbar.Root className="px-4 py-2 bg-gray-200 rounded-b flex items-center justify-between">

            <DueDateDropdown />

            <Toolbar.Button asChild>
                <Button
                    text="Add"
                    disabled={!props.inputValid}
                    onClick={props.onClickAddButton}
                />
            </Toolbar.Button>
        </Toolbar.Root>

    )
}