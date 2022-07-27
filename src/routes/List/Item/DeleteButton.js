import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function DeleteButton(props) {
    return (
        <button onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faTimes} className="text-slate-300 hover:text-slate-500" />
        </button>
    )
}