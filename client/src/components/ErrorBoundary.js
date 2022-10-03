import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Logo } from './Logo';

/**
 * Informs the user that something went wrong.
 */
const ErrorDisplay = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center gap-2">
      <div className="mt-5 mb-10">
        <Logo />
      </div>
      <h1 className="font-bold text-2xl text-slate-900">Unexpected Error</h1>
      <h3 className="text-lg">Something went wrong, please try again later.</h3>
      <a
        href="/"
        className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
      >
        Return Home
      </a>
    </div>
  );
};

/**
 * Component which catches errors in child components.
 * @param {Object} props - The props.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export const ErrorBoundary = ({ children }) => {
  const logError = (error) => {
    console.error('Unexpected Error:', error);
  };
  
  return (
    <ReactErrorBoundary FallbackComponent={ErrorDisplay} onError={logError}>
      {children}
    </ReactErrorBoundary>
  );
};
