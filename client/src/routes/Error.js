import { Logo } from 'components/Logo';
import { Link } from 'react-router-dom';

/**
 * Error page which informs the user something went wrong.
 */
export const Error = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center gap-2 mt-5">
      <div className="mt-5 mb-10">
        <Logo />
      </div>
      <h1 className="font-bold text-2xl text-slate-900">Unexpected Error</h1>
      <h3 className="text-lg">Something went wrong, please try again.</h3>
      <Link
        to={{}}
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        Reload
      </Link>
    </div>
  );
};
