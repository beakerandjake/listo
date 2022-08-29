import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';


export const FocusOnAddItemButton = ({
    addItemRef
}) => {

    const onClick = (e) => {
        console.log('click');
    };

    return (
        <div className="fixed bottom-6 right-6">
            <button
                onClickCapture={onClick}
                className={cx(
                    'h-12 w-12 rounded-full flex items-center justify-center keyboard-only-focus-ring',
                    'shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0px_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]',
                    'text-white bg-green-700'
                )}
            >
                <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
        </div>
    );
};