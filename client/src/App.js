import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from './api';
import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { Sidebar } from 'components/Navigation/Sidebar';
import { CreateNewList, Dashboard, Error, List, NotFound } from 'routes';
import { listLoader } from 'routes/List';

function App() {
  const [lists, setLists] = useState(null);
  const handleError = useErrorHandler();

  useEffect(() => {
    listApi.getLists().then(setLists).catch(handleError);
  }, [handleError]);

  if (!lists) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ResponsiveLayout sidebar={<Sidebar items={lists} />}>
          <Outlet />
        </ResponsiveLayout>
      ),
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'lists/:id',
          element: <List />,
          loader: listLoader,
          errorElement: <NotFound />,
        },
        { path: 'lists/create', element: <CreateNewList /> },
        {
          path: 'coolguy',
          element: <NotFound />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
