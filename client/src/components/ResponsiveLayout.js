import { useEffect, useState } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
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
export const ResponsiveLayout = ({ children }) => {
  return (
    <div className="flex flex-col-reverse">
      {/* Main Content */}
      <div className="md:ml-64 lg:ml-80">
        <main className="p-3 container max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>

      {/* Static Sidebar on Desktop. */}
      <MediaQuery minWidth={MOBILE_BREAKPOINT}>
        <div className="fixed inset-y-0 flex flex-col md:w-64 lg:w-80">
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
