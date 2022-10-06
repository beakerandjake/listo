import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom';
import { listApi } from './api';
import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { Sidebar } from 'components/Navigation/Sidebar';
import { CreateNewList, Dashboard, Error, List, NotFound } from 'routes';
import { listLoader } from 'routes/List';
import { LoadingSpinner } from 'components/LoadingSpinner';

/**
 * Root element used for routing, renders all child routes in its outlet.
 */
const Root = () => {
  const lists = useLoaderData();

  return (
    <ResponsiveLayout sidebar={<Sidebar items={lists} />}>
      <Outlet />
    </ResponsiveLayout>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      loader: async () => await listApi.getLists(),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'lists/:id',
          element: <List />,
          loader: listLoader,
          errorElement: <NotFound />,
        },
        {
          path: 'lists/create',
          element: <CreateNewList />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
  );
}

export default App;
