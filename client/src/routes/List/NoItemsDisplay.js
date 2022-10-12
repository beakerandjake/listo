import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FadeAndPopIn } from 'components/Transition';

/**
 * Used to indicate that the list is empty.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The FontAwesome icon to render.
 * @param {string} props.heading - The message to display.
 * @param {string} props.subHeading - Additional message to display.
 */
export const NoItemsDisplay = ({ icon, heading, subHeading }) => {
  return (
    <FadeAndPopIn in={true} appear>
      <div className="w-full py-5 flex flex-col justify-center items-center gap-2 select-none">
        <FontAwesomeIcon
          icon={icon}
          size="4x"
          fixedWidth
          className="text-gray-400"
        />
        <h1 className="text-xl font-bold text-gray-500">{heading}</h1>
        <h3 className="text-md font-semibold text-gray-400">{subHeading}</h3>
      </div>
    </FadeAndPopIn>
  );
};
