import Logo from "../Logo";
import SidebarEmptyNav from './SidebarEmptyNav';
import SidebarNav from './SidebarNav';


export default function Sidebar(props) {
    // const items = [];
    const items = [...props.items];

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white">
                <div className="flex-shrink-0 px-4 flex items-center justify-center">
                    <Logo />
                </div>
                <div className="flex-shrink-0 mt-5 flex flex-col">
                    {!items.length && <SidebarEmptyNav />}
                    {items?.length > 0 && <SidebarNav items={items} />}
                </div>
            </div>
        </div >
    )
}

