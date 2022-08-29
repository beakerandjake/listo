import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';
import { useOnScreen } from "hooks/useOnScreen";
import { Transition } from "components/Transition";


/**
 * A floating button in the bottom right corner of the screen. 
 * Visibility is based on whether or not the Add Item component is currently on screen.
 * When clicked will focus the Add Item Component.
 * @param {Object} props - The props.
 * @param {MutableRefObject} props.addItemRef - A ref of the Add Item component.
 */
export const FocusOnAddItemButton = ({
    addItemRef
}) => {
    

    // offset the top of the viewport by the size of the sticky header.
    const addItemIsOnScreen = useOnScreen(addItemRef, '-56px 0px 0px 0px');

    const onClick = (e) => {
        addItemRef.current.focus();
        e.preventDefault();
    };

    return (
        <Transition
            in={!addItemIsOnScreen}
            unmountOnExit
            classNames={{
                enter: 'opacity-0 scale-0',
                enterActive: 'transition-[transform,opacity] ease-out !opacity-100 !scale-100',
                exit: 'opacity-100 scale-100',
                exitActive: 'transition-[transform,opacity] ease-out !opacity-0 !scale-0'
            }}
        >
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
        </Transition>
    );
};