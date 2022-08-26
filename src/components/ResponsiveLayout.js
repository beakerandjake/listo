import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { Navbar, CollapsibleSidebarContainer } from 'components/Navigation';

const MOBILE_BREAKPOINT = 768;

/**
 * Renders a Navbar with a toggle to open a drawer containing the sidebar.
 * @param {Object} props - The Props.
 * @param {React.ReactNode} props.children - The sidebar.
 */
const MobileSidebar = ({ children }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // close the sidebar any time navigation takes place. 
    useEffect(() => {
        setOpen(false);
    }, [location]);

    return (
        <>
            <Navbar onClickOpenMenuButton={() => setOpen(!open)} />
            <CollapsibleSidebarContainer open={open} onSetClose={() => setOpen(false)}>
                {children}
            </CollapsibleSidebarContainer>
        </>
    );
};

/**
 * Layout which adjusts content based on the width of the viewport..
 * @param {Object} props - The Props.
 * @param {React.ReactNode} props.sidebar - The content of the sidebar.
 * @param {React.ReactNode} props.children - The content of the page.
 */
export const ResponsiveLayout = ({
    sidebar,
    children
}) => {
    return (
        <div>
            {/* Static Sidebar on Desktop. */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <div className="fixed inset-y-0 w-64 flex">
                    {sidebar}
                </div>
            </MediaQuery>
            {/* Navbar / Sidebar drawer on Mobile */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT - 1}>
                <MobileSidebar>
                    {sidebar}
                </MobileSidebar>
            </MediaQuery>
            {/* Main Content */}
            <main className="fixed inset-0 top-14 md:left-64 md:top-0 p-3 sm:p-6 md:p-8 flex flex-col">
                {children}
            </main>
        </div>
    )
};