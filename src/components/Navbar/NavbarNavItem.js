import { NavLink } from "react-router-dom";
import { Disclosure } from '@headlessui/react';
import SidebarBadge from "components/Sidebar/SidebarBadge";


function activeNavStyle(isActive) {
    return isActive
        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700';
}

export default function NavbarNavItem(props) {
    console.log(props.closeFn);
    return (
        // <NavLink
        //     to={props.to}
        //     className={({ isActive }) => activeNavStyle(isActive) + ' group flex items-center px-2 py-2 text-base font-medium rounded-md'}
        //     children={({ isActive }) => (
        //         <>
        //             <FontAwesomeIcon icon={icon} fixedWidth className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0" />
        //             <span className="flex-1">{props.name}</span>
        //             <SidebarBadge count={props.count} active={isActive} />
        //         </>
        //     )}
        // />

        //     <Disclosure.Button
        //     key={item.id}
        //     as="a"
        //     href="#"
        //     className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        // >
        //     {item.name}
        // </Disclosure.Button>

        <NavLink
            to={props.to}
            onClick={props.closeFn}
            className={({ isActive }) => activeNavStyle(isActive) + ' block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
            children={({ isActive }) => (
                <>
                    {/* <FontAwesomeIcon icon={icon} fixedWidth className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0" /> */}
                    <span className="flex-1">{props.name}</span>
                    <SidebarBadge count={props.count} active={isActive} />
                </>
            )}
        />
    )
}