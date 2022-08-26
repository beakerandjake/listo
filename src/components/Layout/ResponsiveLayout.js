import MediaQuery from 'react-responsive';
import { StatefulMenu } from 'components/Menu';
import { Navbar, CollapsibleSidebarContainer } from 'components/Navigation';

const MOBILE_BREAKPOINT = 768;

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
        <div className="h-screen flex flex-col">
            {/* Static Sidebar on Desktop. */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <div className="fixed inset-y-0 flex flex-col w-64">
                    {sidebar}
                </div>
            </MediaQuery>
            {/* Navbar / Sidebar drawer on Mobile */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT - 1}>
                <StatefulMenu>
                    {({ open, setOpen }) => (
                        <>
                            <Navbar onClickOpenMenuButton={() => setOpen(!open)} />
                            <CollapsibleSidebarContainer open={open} onSetClose={() => setOpen(false)}>
                                {sidebar}
                            </CollapsibleSidebarContainer>
                        </>
                    )}
                </StatefulMenu>
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