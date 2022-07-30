import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function IconButton(props) {
    const className = props.className || 'text-slate-300 hover:text-slate-500';

    return (
        <button onClick={props.onClick} disabled={props.disabled} title={props.title} className="focus:outline-none">
            <FontAwesomeIcon icon={props.icon} className={className} />
        </button>
    )
}