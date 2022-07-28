import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function IconButton(props) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} title={props.title}>
            <FontAwesomeIcon icon={props.icon} className="text-slate-300 hover:text-slate-500" />
        </button>
    )
}