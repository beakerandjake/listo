import * as Toolbar from '@radix-ui/react-toolbar';
import { Button } from 'components/Button';

export function AddItemToolbar(props) {
    return (
        <Toolbar.Root className="p-2 bg-gray-200 rounded-b flex items-center justify-between" tabIndex={props.inputValid ? 0 : -1}>
            <div>
                ASDF
            </div>
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