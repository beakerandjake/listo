import { useState } from "react";
import cx from 'classnames';
import { faSquareCheck as faSquareCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck as faSquareCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CompletedCheckbox(props) {
    const [hover, setHover] = useState(false);

    const onKeyDown = e => {
        if (e.keyCode === 32 || e.key === "Enter") {
            props.onChange(!props.checked);
        }
    }

    const toggleValue = e => {
        e.stopPropagation();
        props.onChange(!props.checked);
    }

    const style = props.checked ? 'text-green-700' : 'text-gray-400'

    let icon = props.checked
        ? faSquareCheckSolid
        : (hover ? faSquareCheckRegular : faSquare);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={"flex items-center justify-center w-8 h-8 rounded cursor-pointer group focus:outline-none"}
            onClick={toggleValue}
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            <FontAwesomeIcon
                icon={icon}
                className={cx(
                    style,
                    "rounded group-focus:outline-none group-focus:ring-2 group-focus:ring-green-600 group-focus:ring-offset-2"
                )}
            />
        </div>
    )
}