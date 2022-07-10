import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function Logo(props) {
    return (
        <Link to="/" className="select-none flex-shrink-0 font-medium text-4xl md:text-4xl text-gray-600 whitespace-nowrap cursor-pointer">
            listo
            <FontAwesomeIcon icon={faSquareCheck} className="text-3xl text-green-700 pl-1" />
        </Link>
    );
}