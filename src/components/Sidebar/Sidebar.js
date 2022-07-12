import Logo from '../Logo';
import SidebarNavItem from './SidebarNavItem';
import SidebarNav from './SidebarNav';

export function Sidebar(props) {
    return (
        // <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white">
                <div className="flex-shrink-0 px-4 flex items-center">
                    <Logo />
                </div>
                <div className="flex-shrink-0 mt-5 flex flex-col px-2">
                    {/* When no lists exit, only render a nav item for the "create list" page. */}
                    {props.items?.length
                        ? <SidebarNav items={props.items} />
                        : <SidebarNavItem key="create" to="lists/create" name="Create New List" iconName="plus" />
                    }
                </div>
            </div>
        // </div >
    )
}

