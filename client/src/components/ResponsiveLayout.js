import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import {
  Navbar,
  CollapsibleSidebarContainer,
  Sidebar,
} from 'components/Navigation';

const MOBILE_BREAKPOINT = 768;

/**
 * Renders a Navbar with a toggle to open a drawer containing the sidebar.
 * @param {Object} props - The Props.
 * @param {React.ReactNode} props.children - The sidebar.
 */
const MobileSidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { state: navigationState } = useNavigation();
  const location = useLocation();

  // close the sidebar any time a navigation loader starts.
  useEffect(() => {
    if (navigationState === 'loading') {
      setOpen(false);
    }
  }, [navigationState]);

  // close the sidebar any time the browser location changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <Navbar onClickMenuButton={() => setOpen(!open)} />
      <CollapsibleSidebarContainer open={open} onClose={() => setOpen(false)}>
        {children}
      </CollapsibleSidebarContainer>
    </>
  );
};

/**
 * Layout which adjusts content based on the width of the viewport..
 */
export const ResponsiveLayout = () => {
  return (
    <div className="flex flex-col-reverse">
      {/* Main Content */}
      <div className="md:ml-64 flex flex-col flex-1">
        <main className="flex-1 flex flex-col p-3 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Static Sidebar on Desktop. */}
      <MediaQuery minWidth={MOBILE_BREAKPOINT}>
        <div className="fixed inset-y-0 flex flex-col w-64">
          <Sidebar />
        </div>
      </MediaQuery>

      {/* Navbar / Sidebar drawer on Mobile */}
      <MediaQuery maxWidth={MOBILE_BREAKPOINT - 1}>
        <MobileSidebar>
          <Sidebar />
        </MobileSidebar>
      </MediaQuery>
    </div>
  );
};

export const mobileBreakpoint = MOBILE_BREAKPOINT;
