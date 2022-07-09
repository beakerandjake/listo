import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import Layout from './Old/Layout';
import { getLists } from './services/listService';

function App() {
  const [lists, setLists] = useState([]);
  const handleError = useErrorHandler();

  useEffect(handle => {
    async function fetchLists() {
      try {
        let response = await getLists();
        setLists(response);
      } catch (error) {
        handleError(error);
      }
    }

    fetchLists();
  }, [setLists, handleError]);

  return (
    <div>
      Lists: {lists.map(x => <p>{x.name}</p>)}
    </div>
    // <Layout />
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
