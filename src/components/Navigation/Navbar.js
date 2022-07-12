import Logo from "components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Navbar(props) {
    return (
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow gap-4">
            <button
                onClick={props.onClickOpenMenuButton}
                className="px-4 border-r border-gray-200 cursor-pointer text-gray-500 hover:text-gray-900 focus:outline-none"
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="self-center">
                <Logo />
            </div>
        </div>
    )
}