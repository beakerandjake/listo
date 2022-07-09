import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function DeleteButton(props) {
    return (
        <div title="Delete item">
            <FontAwesomeIcon
                icon={faTrashCan}
                className="bg-none border-none underline cursor-pointer text-gray-600 hover:text-red-600"
                {...props}
            />
        </div>
    );
}