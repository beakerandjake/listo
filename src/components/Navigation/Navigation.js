import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { CollapsibleSidebarContainer } from './CollapsibleSidebarContainer';

export function Navigation(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <CollapsibleSidebarContainer open={menuOpen} onSetClose={() => setMenuOpen(false)}>
                <Sidebar />
            </CollapsibleSidebarContainer>
            <Navbar onClickOpenMenuButton={() => setMenuOpen(true)} />

            <p>Menu Open: {menuOpen ? 'true' : 'false'}</p>
        </>
    )
}