import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'routes/NotFound';
import { ResponsiveLayout } from 'components/Layout/ResponsiveLayout';
import { Sidebar } from 'components/Navigation/Sidebar';
import { useErrorHandler } from 'react-error-boundary';
import { getLists } from './services/listService';
import { CreateNewList } from 'routes/CreateNewList';
import { List } from 'routes/List';
import { Dashboard } from 'routes/Dashboard';

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
    <ResponsiveLayout sidebar={<Sidebar items={lists} />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="lists">
          <Route path=":id" element={<List />} />
          <Route path="create" element={<CreateNewList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ResponsiveLayout>
  );
}

export default App;
