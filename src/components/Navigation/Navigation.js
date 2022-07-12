import { Fragment, useState } from 'react';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Navbar } from './Navbar';
import { Transition, Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTimesCircle, faTimesRectangle } from '@fortawesome/free-solid-svg-icons';
import { CollapsibleSidebar } from './CollapsibleSidebar';

export function Navigation(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    console.log(menuOpen);
    return (
        <>
            <CollapsibleSidebar open={menuOpen} onSetClose={() => setMenuOpen(false)}>
                <div>Hello Sidebar!</div>
            </CollapsibleSidebar>
            <Navbar onClickOpenMenuButton={() => setMenuOpen(true)} />
            
            <p>Menu Open: {menuOpen ? 'true' : 'false'}</p>


            {/* <Sidebar items={props.items} /> */}
        </>
    )
}