import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorBoundary = ({ fallbackComponent, children }) => {
  const logError = (error, info) => {
    console.error('unexpected error', error, info);
  };

  return (
    <ReactErrorBoundary
      fallbackComponent={fallbackComponent}
      onError={logError}
    >
      {children}
    </ReactErrorBoundary>
  );
};
