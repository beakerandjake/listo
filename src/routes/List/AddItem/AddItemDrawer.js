import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/pro-solid-svg-icons";
import cx from 'classnames';
import { Button } from "components/Button";
import { Drawer } from "components/Drawer";
import {
    MenuFooter,
    MenuHeader,
    MenuTitle,
    ScrollableMenuContent
} from "components/Menu";
import {
    ItemDueDateMenu,
    ItemNameInput,
    ItemNoteInput,
    ItemQuantityMenu,
} from "../Item";

/**
 * Fixed button which floats in the bottom right of the screen.
 * @param {object} props - the props
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 **/
const FloatingAddButton = ({ onClick }) => {
    return (
        <div className="fixed bottom-6 right-6">
            <button
                title="Add Item"
                onClickCapture={onClick}
                className={cx(
                    'h-12 w-12 rounded-full flex items-center justify-center keyboard-only-focus-ring',
                    'shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0px_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]',
                    'text-white bg-green-700 hover:bg-green-800'
                )}
            >
                <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
        </div>
    );
};

/**
 * Mobile friendly drawer with fields to create a new item.
 * @param {object} props - the props
 * @param {function} props.onAddItem - Callback invoked when the user wants to add a new Item to the list.
 **/
export const AddItemDrawer = ({
    open,
    onOpenChange,
    onCloseTransitionComplete,
    item,
    itemIsValid,
    onItemChange,
    onAddItem,
}) => {
    return (
        <>
            <Drawer
                open={open}
                onClose={() => onOpenChange(false)}
                anchor="bottom"
                size="xl"
                showCloseButton
                closeButtonIcon={faChevronDown}
                onExitTransitionComplete={onCloseTransitionComplete}
            >
                <MenuHeader className="flex items-center justify-center">
                    <MenuTitle>Add New Item</MenuTitle>
                </MenuHeader>
                <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-3 bg-gray-50">
                    <ItemNameInput
                        value={item.name}
                        onChange={value => onItemChange({ name: value })}
                        onSubmit={onAddItem}
                    />
                    <ItemQuantityMenu
                        quantity={item.quantity}
                        onChange={value => onItemChange({ quantity: value })}
                        onReset={value => onItemChange({ quantity: value })}
                    />
                    <ItemDueDateMenu
                        dueDate={item.dueDate}
                        onChange={value => onItemChange({ dueDate: value })}
                    />
                    <ItemNoteInput
                        value={item.note}
                        onChange={value => onItemChange({ note: value })}
                    />
                </ScrollableMenuContent>
                <MenuFooter className="flex items-center justify-center gap-3">
                    <Button
                        title="Cancel"
                        className="flex-1"
                        size="responsive"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        title="Add Item"
                        className="flex-1"
                        variant="success"
                        size="responsive"
                        onClick={onAddItem}
                        disabled={!itemIsValid}
                    >
                        Add
                    </Button>
                </MenuFooter>
            </Drawer>

            <FloatingAddButton onClick={() => onOpenChange(true)} />
        </>
    );
};