import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIcon } from 'services/iconLibrary';
import SidebarBadge from './SidebarBadge';

function activeNavStyle(isActive) {
    return isActive
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
}

export default function SidebarNavItem(props) {
    const icon = getIcon(props.iconName);

    return (
        <NavLink
            to={props.to}
            className={({ isActive }) => activeNavStyle(isActive) + ' group flex items-center px-2 py-2 text-base font-medium rounded-md'}
            children={({ isActive }) => (
                <>
                    <FontAwesomeIcon icon={icon} fixedWidth className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0" />
                    <span className="flex-1">{props.name}</span>
                    <SidebarBadge count={props.count} active={isActive} />
                </>
            )}
        />
    );
}