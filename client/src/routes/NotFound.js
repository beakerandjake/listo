import { PageHeader } from 'components/PageHeader';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function NotFound() {
  const error = useRouteError();

  // If the error is coming from a react-router-dom loader
  // check to see if the error status is actually a 404.
  // If it's not a 404, re-throw the error so a different error handler can handle it.
  if (error?.statusCode && error.statusCode !== 404) {
    throw error;
  }

  return (
    <>
      <PageHeader name="Not Found" />
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      </div>
    </>
  );
}
