import { Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import NavbarNavItem from './NavbarNavItem';


export default function Navbar(props) {
    const getNavItems = (closeFn) => props.items.map(item => (
        <NavbarNavItem
            key={item.id}
            to={`/lists/${item.id}`}
            closeFn={closeFn}
            {...item}
        />
    ));

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open, close }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Disclosure.Button className="outline-none select-none">
                                <div onClick={() => close(null)}>
                                    <Logo />
                                </div>
                            </Disclosure.Button>
                            <div className="-mr-2 flex items-center">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <FontAwesomeIcon icon={open ? faX : faBars} />
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel>
                        <div className="pt-2 pb-3 space-y-1">
                            {getNavItems(close)}
                        </div>

                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}