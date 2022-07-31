import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

export function Status(props) {
    return (
        <div className={classNames("flex items-center gap-1 text-gray-500 text-xs font-medium", props.className)}>
            <FontAwesomeIcon icon={props.icon} />
            <span>{props.text}</span>
        </div>
    )
}