import { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Badge } from "components/Badge";

export function CompletedItemsContainer(props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div
                className={classNames(
                    { "border-b border-gray-200": !expanded },
                    "transition-all duration-75 pt-5 pb-5 flex items-center gap-2 cursor-pointer select-none"
                )}
                onClick={() => setExpanded(!expanded)}
            >
                <FontAwesomeIcon icon={faChevronRight} fixedWidth className={classNames({ 'rotate-90': expanded }, "transition-transform")} />
                <h3 className="text-md leading-6 font-medium text-gray-700">
                    <span className="pr-2">Completed</span>
                    <Badge content={props.items.length} size="lg" variant="success" />
                </h3>
            </div>

        </div>
    )
}