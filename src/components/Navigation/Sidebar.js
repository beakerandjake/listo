import Logo from "components/Logo";
import { SidebarNav } from "./SidebarNav";
import { SidebarNavItem } from "./SidebarNavItem";

export function Sidebar(props) {
    return (
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
            <div className="flex-shrink-0 flex  justify-center items-center px-4 py-4 space-y-5">
                <Logo />
            </div>
            <div className="flex-grow flex flex-col">
                <nav className="flex-1 bg-white space-y-1">
                    {/* When no lists exit, only render a nav item for the "create list" page. */}
                    {props.items?.length
                        ? <SidebarNav items={props.items} />
                        : <SidebarNavItem key="create" to="lists/create" name="Create New List" iconName="plus" />
                    }
                </nav>
            </div>
        </div>
    )
}