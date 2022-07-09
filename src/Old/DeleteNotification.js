import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function DeleteNotification(props) {
    return (
        <div className="max-w-sm w-full bg-yellow-50 shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-3">
                <div className="flex items-center">
                    <div className="w-0 flex-1 flex justify-between">
                        {/* Message */}
                        <p className="w-0 flex-1 text-sm text-gray-900">
                            Deleted <span className="font-semibold">{props.name}</span>
                        </p>
                        {/* Undo Button */}
                        <button
                            type="button"
                            className="ml-3 flex-shrink-0 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                            onClick={props.onUndo}
                        >
                            Undo
                        </button>
                    </div>
                    {/* Dismiss button */}
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            type="button"
                            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={props.onDismiss}
                        >
                            <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}