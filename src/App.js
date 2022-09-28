import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from 'routes/NotFound';
import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { Sidebar } from 'components/Navigation/Sidebar';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from './api';
import { CreateNewList } from 'routes/CreateNewList';
import { List } from 'routes/List';
import { Dashboard } from 'routes/Dashboard';

function App() {
  const [lists, setLists] = useState(null);
  const handleError = useErrorHandler();

  useEffect(() => {
    listApi.getLists()
      .then(setLists)
      .catch(handleError);
  }, [handleError]);

  if (!lists) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
