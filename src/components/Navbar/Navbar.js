import { Disclosure } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faHamburger, faH, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';


export default function Navbar(props) {
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="-mr-2 flex items-center">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <FontAwesomeIcon icon={open ? faX : faBars} />
                            </Disclosure.Button>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}