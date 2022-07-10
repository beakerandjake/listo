import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIcon } from 'services/listIconService';

export default function SidebarNavItem(props) {
    const icon = getIcon(props.iconName);
    const selectedStyle = props.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'

    return (
        <a href="/" className={selectedStyle + " group flex items-center px-2 py-2 text-base font-medium rounded-md"}>
            <FontAwesomeIcon icon={icon} fixedWidth className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0" />
            {props.name}
        </a>
    );
}