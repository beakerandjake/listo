import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { getIcon } from 'services/iconLibrary';

/**
 * A sidebar item which links to a page.
 * @param {Object} props
 * @param {array} props.text - The text to display.
 * @param {string} props.iconName - The name of the icon to display.
 * @param {string} props.to - The route to link to when clicked.
 * @param {function} props.children - Render function which provides information on if the current item is active.
 */
export const SidebarNavItem = ({
  text,
  iconName,
  to,
  children = ({ isActive }) => {},
}) => {
  const icon = getIcon(iconName);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          { 'bg-green-50 border-green-700 text-gray-900': isActive },
          {
            'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900':
              !isActive,
          },
          'group flex items-center px-3 py-3 md:py-2 border-l-4 keyboard-only-focus-ring'
        )
      }
      children={({ isActive }) => (
        <>
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            size="lg"
            className="text-black mr-3 flex-shrink-0"
          />
          <span className="flex-1 text-md font-medium">{text}</span>
          {children({ isActive })}
        </>
      )}
    />
  );
};
