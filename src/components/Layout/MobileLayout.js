import { useState, useEffect } from 'react';
import { Navbar } from '../Navigation/Navbar';
import { CollapsibleSidebarContainer } from '../Navigation/CollapsibleSidebarContainer';
import { useLocation } from 'react-router-dom';

export function MobileLayout(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // close the sidebar any time navigation takes place. 
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <>
            <Navbar onClickOpenMenuButton={() => setMenuOpen(true)} />
            <CollapsibleSidebarContainer open={menuOpen} onSetClose={() => setMenuOpen(false)}>
                {props.sidebar}
            </CollapsibleSidebarContainer>
            <main>
                {props.children}
            </main>
        </>
    )
}