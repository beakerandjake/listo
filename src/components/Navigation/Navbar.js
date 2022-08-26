import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLogo } from "components/NavLogo";

export function Navbar(props) {
    return (
        <div className="sticky top-0 h-14 flex flex-shrink-0 gap-4 bg-white shadow-md border-b border-gray-300">
            <button
                onClick={props.onClickOpenMenuButton}
                className="px-4 border-r border-gray-200 cursor-pointer text-gray-500 hover:text-gray-900 focus:outline-none"
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="self-center">
                <NavLogo />
            </div>
        </div>
    )
}