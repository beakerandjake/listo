import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSpiralEyes } from '@fortawesome/pro-light-svg-icons';
import { useRouteError } from 'react-router-dom';

export function NotFound() {
  const error = useRouteError();

  // If the error is coming from a react-router-dom loader
  // check to see if the error status is actually a 404.
  // If it's not a 404, re-throw the error so a different error handler can handle it.
  if (error && error?.statusCode !== 404) {
    throw error;
  }

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="text-center">
        <FontAwesomeIcon
          icon={faFaceSpiralEyes}
          size="10x"
          className="text-gray-600"
        />
        <h3 className="mt-3 text-xl font-medium text-gray-500">Not Found</h3>
      </div>
    </div>
  );
}
