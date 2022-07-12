import { Disclosure, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import NavbarNavItem from './NavbarNavItem';


export default function Navbar(props) {
    const getNavItems = (closeFn) => props.items.map(item => (
        <NavbarNavItem
            key={item.id}
            onClick={closeFn}
            to={`/lists/${item.id}`}
            {...item}
        />
    ));

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open, close: closeFn }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="outline-none select-none" onClick={closeFn}>
                                <Logo />
                            </div>
                            <div className="-mr-2 flex items-center">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <FontAwesomeIcon icon={open ? faX : faBars} />
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <Transition
                        enter="transition duration-50 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-10 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel>
                            <div className="pt-2 pb-3 space-y-1">
                                <NavbarNavItem key="home" to="" name="Dashboard" iconName="house" onClick={closeFn} />
                                {getNavItems(closeFn)}
                                <NavbarNavItem key="create" to="/lists/create" name="Create New List" iconName="plus" onClick={closeFn} />
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                    {open && <div className="z-10 w-full h-full absolute" onClick={closeFn} />}
                </>
            )}
        </Disclosure>
    );
}