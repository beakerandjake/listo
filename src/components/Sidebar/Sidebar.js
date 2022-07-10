import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../Logo";
import SidebarNavItem from "./SidebarNavItem";


export default function Sidebar(props) {
    const location = useLocation();

    const navItems = props.items.map(item => (
        <SidebarNavItem key={item.id} to={`/lists/${item.id}`} name={item.name} iconName={item.iconName} />
    ));

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
                {location.pathname !== '/lists/create' &&
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4 transition-opacity">
                        <Link to="lists/create" className="flex-shrink-0 w-full block">
                            <FontAwesomeIcon icon={faCirclePlus} className="text-green-700 mr-3" />
                            Add New List
                        </Link>
                    </div>
                }
            </div>
        </div >
    )
}

