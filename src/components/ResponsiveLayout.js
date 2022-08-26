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
        <div className="flex flex-col">
            {/* Static Sidebar on Desktop. */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <div className="fixed inset-y-0 flex flex-col w-64">
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
            <div className="md:ml-64 flex flex-col flex-1 overflow-y-auto">
                <main className="flex-1 flex flex-col m-3 sm:m-6 md:m-8">
                    {children}
                </main>
            </div>
        </div>
    )
};