import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(props) {
    const lists = props.items.map(item => (
        <a key={item.id} href="/" lassName="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
            <FontAwesomeIcon icon={faCirclePlus} className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"/>
            {item.name}
        </a>
    ));

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                <div className="flex-shrink-0 px-4 flex items-center">
                    <Logo />
                </div>
                <div className="flex-grow mt-5 flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        {lists}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <div className="flex-shrink-0 w-full block">
                        <FontAwesomeIcon icon={faCirclePlus} className="text-green-700 mr-3" />
                        Add New List
                    </div>
                </div>
            </div>
        </div >
    )
}