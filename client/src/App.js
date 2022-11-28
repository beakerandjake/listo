import React from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import { listApi } from './api';
import { Dashboard, Error, List, NotFound } from 'routes';
import { listLoader } from 'routes/List';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Root, routeId as rootRouteId } from 'routes/Root';

const ROUTES = [
  [
    {
      path: '/',
      id: rootRouteId,
      element: <Root />,
      loader: async () => await listApi.getLists(),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'lists/:listId',
          element: <List />,
          loader: listLoader,
          errorElement: <NotFound />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
      errorElement: <Error />,
    },
  ],
];

// Some hosting providers don't support browser router, when deploying to
// choose router based on current configuration to support for these providers.
const router = process.env.REACT_APP_USE_HASH_ROUTER
  ? createHashRouter(ROUTES)
  : createBrowserRouter(ROUTES);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="items-center flex h-screen justify-center">
          <LoadingSpinner renderDelayMs={500} />
        </div>
      }
    />
  );
}

export default App;
