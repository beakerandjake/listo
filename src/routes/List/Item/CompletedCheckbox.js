import { useState } from "react";
import cx from 'classnames';
import { faSquareCheck as faSquareCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck as faSquareCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CompletedCheckbox(props) {
    const [hover, setHover] = useState(false);

    const toggleValue = e => {
        e.stopPropagation();
        props.onChange(!props.checked);
    }

    const orig = (
        <div className="flex items-center p-2 cursor-pointer" onClick={e => toggleValue(e)}>
            <input
                type="checkbox"
                className="focus:ring-green-500 text-green-700 border-gray-300 rounded cursor-pointer"
                checked={props.checked}
                onChange={toggleValue}
            />
        </div>
    );

    const style = props.checked ? 'text-green-700' : 'text-gray-400'

    let icon = props.checked
        ? faSquareCheckSolid
        : (hover ? faSquareCheckRegular : faSquare);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={"flex items-center justify-center p-1 cursor-pointer rounded group focus:outline-none"}
            onClick={toggleValue}
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