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
import { AppLoadingSpinner } from 'routes/AppLoadingSpinner';

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
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
          ],
        },
        {
          errorElement: <Error />,
          children: [
            {
              path: 'lists/:id',
              element: <List />,
              loader: listLoader,
              errorElement: <NotFound />,
            },
          ],
        },
        {
          errorElement: <Error />,
          children: [
            {
              path: 'lists/create',
              element: <CreateNewList />,
            },
          ],
        },
        {
          errorElement: <Error />,
          children: [
            {
              path: '*',
              element: <NotFound />,
            },
          ],
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<AppLoadingSpinner />} />
  );
}

export default App;
