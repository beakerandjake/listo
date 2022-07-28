import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function DeleteButton(props) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} title="Delete Item">
            <FontAwesomeIcon icon={faTrashAlt} className="text-slate-300 hover:text-slate-500" />
        </button>
    )
}