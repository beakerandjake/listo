import Logo from "components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Navbar(props) {
    return (
        <>
            <div className="flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex flex-shrink-0  h-16 bg-white shadow">
                    <button
                        onClick={props.onClickOpenMenuButton}
                        className="px-4 border-r border-gray-200 cursor-pointer text-gray-500 hover:text-gray-900 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className="flex-1 px-4 flex items-center">
                        <Logo />
                    </div>
                </div>
            </div>
        </>
    )
}