import Logo from "../Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import SidebarNavItem from "./SidebarNavItem";


export default function Sidebar(props) {
    const navItems = props.items.map(item => (<SidebarNavItem key={item.id} {...item} />));

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white">
                <div className="flex-shrink-0 px-4 flex items-center justify-center">
                    <Logo />
                </div>
                <div className="flex-grow mt-5 flex flex-col ">
                    <nav className="flex-1 px-2 pb-4 space-y-1 ">
                        {navItems}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <div className="flex-shrink-0 w-full block">
                        <FontAwesomeIcon icon={faCirclePlus} className="text-green-700 mr-3" />
                        Add New List
                    </div>
                </div>
            </div>
        </div >
    )
}

