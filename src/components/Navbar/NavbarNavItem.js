import { NavLink } from "react-router-dom";
import SidebarBadge from "components/Sidebar/SidebarBadge";
import { getIcon } from 'services/iconLibrary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function activeNavStyle(isActive) {
    return isActive
        ? 'border-green-700 bg-gray-100 text-gray-900'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700';
}

export default function NavbarNavItem(props) {
    const icon = getIcon(props.iconName);

    return (
        <NavLink
            to={props.to}
            onClick={props.onClick}
            className={({ isActive }) => activeNavStyle(isActive) + ' block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
            children={({ isActive }) => (
                <>
                    <FontAwesomeIcon icon={icon} fixedWidth className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0" />
                    <span className="flex-1">{props.name}</span>
                    <SidebarBadge count={props.count} active={isActive} />
                </>
            )}
        />
    )
}