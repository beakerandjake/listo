import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getLists } from './services/listService';
import { TestNavbar } from 'components/TestNavbar/TestNavbar';
import { Navigation } from 'components/Navigation/Navigation';
import { MobileLayout } from 'components/Navigation/MobileLayout';
import { DesktopLayout } from 'components/Navigation/DesktopLayout';
function App() {
  const [initialized, setInitialized] = useState(false);
  const [lists, setLists] = useState([]);
  const handleError = useErrorHandler();

  useEffect(handle => {
    async function fetchLists() {
      try {
        let response = await getLists();
        setLists(response);
        setInitialized(true);
      } catch (error) {
        handleError(error);
      }
    }

    fetchLists();
  }, [setLists, handleError]);

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* <MobileLayout items={lists} /> */}
      <MobileLayout items={lists}>
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
            {/* /End replace */}
          </div>
        </div>
      </MobileLayout>
      {/* <TestNavbar /> */}

      {/* <Sidebar items={lists} /> */}
      {/* <Navbar items={lists} /> */}
      {/* <div>
        HELLO WORLD ITS LISTO
      </div> */}
    </div>


    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-3xl mx-auto">
    //     <div class="flex justify-center mt-2 border-b-2 py-2 mb-2">
    //       <Logo />
    //     </div>
    //     <div>
    //       <ListSelection />
    //     </div>
    //     <div>
    //       <Parent />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
