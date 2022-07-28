import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from '@fortawesome/free-solid-svg-icons';

export function EditButton(props) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} title="Edit Item">
            <FontAwesomeIcon icon={faPencil} className="text-slate-300 hover:text-slate-500" />
        </button>
    )
}