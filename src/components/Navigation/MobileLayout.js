import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { CollapsibleSidebarContainer } from './CollapsibleSidebarContainer';
import { useLocation } from 'react-router-dom';

export function MobileLayout(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // close the sidebar anytime navigation takes place. 
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <>
            <CollapsibleSidebarContainer open={menuOpen} onSetClose={() => setMenuOpen(false)}>
                <Sidebar items={props.items} />
            </CollapsibleSidebarContainer>
            <Navbar onClickOpenMenuButton={() => setMenuOpen(true)} />
            <main>
                {props.children}
            </main>
        </>
    )
}