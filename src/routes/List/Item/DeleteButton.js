import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDashboard, faMinus, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export function DeleteButton(props) {

    return (
        <button onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faTrashCan} className="text-slate-400 hover:text-slate-600" />
        </button>
    )
}