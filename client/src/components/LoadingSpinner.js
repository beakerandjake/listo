import { faLoader } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DelayedRender } from 'components/DelayedRender';
import { FadeAndPopIn } from 'components/Transition';

/**
 * Loading Spinner intended to be used when loading the application itself.
 * Assumes the app will load and initialize quickly and has a delay built in before rendering.
 * That way there isn't a quick flash of content.
 */
export const LoadingSpinner = () => {
  return (
    <DelayedRender>
      <FadeAndPopIn in appear>
        <div className="items-center flex h-screen justify-center ">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faLoader}
              spin
              size="5x"
              className="text-gray-600"
            />
            <p className="mt-4 text-xl font-medium text-gray-500">Loading...</p>
          </div>
        </div>
      </FadeAndPopIn>
    </DelayedRender>
  );
};
