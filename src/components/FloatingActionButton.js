import cx from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Bottom Right floating icon.
 * @param {Object} props - The Props.
 * @param {IconDefinition} props.icon - The icon of the button
 * @param {string=} props.className - Additional Styles to apply to the icon
 * @param {function} props.onClick - Callback invoked when the user clicks.
 */
export const FloatingActionButton = ({
    icon,
    onClick,
    className,
}) => {
    return (
        <div className="fixed bottom-6 right-6">
            <button
                onClickCapture={onClick}
                className={cx(
                    'h-12 w-12 rounded-full flex items-center justify-center keyboard-only-focus-ring shadow-md',
                    className
                )}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </div>
    );
};