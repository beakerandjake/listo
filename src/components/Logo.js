import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/pro-solid-svg-icons';

export function Logo(props) {
    return (
        <div className="select-none focus:outline-none flex-shrink-0 font-medium text-4xl md:text-4xl text-gray-600 whitespace-nowrap">
            listo
            <FontAwesomeIcon icon={faSquareCheck} className="text-3xl text-green-700 pl-1" />
        </div>
    );
}