import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { getIcon } from 'services/iconLibrary';
import { Badge } from 'components/Badge';

export function SidebarNavItem(props) {
    const icon = getIcon(props.iconName);

    return (
        <NavLink
            to={props.to}
            className={
                ({ isActive }) => classNames({
                    'bg-green-50 border-green-700 text-gray-900': isActive,
                    'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900': !isActive
                }, 'group flex items-center px-3 py-3 md:py-2 text-md font-medium border-l-4 keyboard-only-focus-ring')
            }
            children={({ isActive }) => (
                <>
                    <FontAwesomeIcon icon={icon} fixedWidth size="lg" className="mr-3 flex-shrink-0" />
                    <span className="flex-1">{props.name}</span>
                    {props.count > 1 && (
                        <Badge size="lg" variant={isActive ? 'success' : 'default'}>
                            {props.count}
                        </Badge>
                    )}
                </>
            )}
        />
    );
}