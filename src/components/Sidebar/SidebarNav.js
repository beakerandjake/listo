import SidebarNavItem from "./SidebarNavItem";
import SidebarHeader from './SidebarHeader';

export default function SidebarNav(props) {
    const lists = props.items.map(item => (
        <SidebarNavItem key={item.id} to={`/lists/${item.id}`} {...item} />
    ));

    return (
        <nav className="flex-1">
            <div className="space-y-3">
                <SidebarNavItem key="home" to="" name="Dashboard" iconName="house" />
                <div className="space-y-1">
                    <SidebarHeader name="Lists" />
                    <div className="px-2">
                        {lists}
                        <SidebarNavItem
                            key="create"
                            to="/lists/create"
                            name="Create New List"
                            iconName="plus"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}