import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageHeader } from 'components/PageHeader';

/**
 * Renders the Title of the List with an Icon.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The Icon on the list.
 * @param {string} props.name - Name of the list.
 */
export const Title = ({ name, icon }) => {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon
        icon={icon}
        fixedWidth
        className="text-gray-500 text-lg sm:text-2xl"
      />
      <PageHeader name={name} />
    </div>
  );
};
