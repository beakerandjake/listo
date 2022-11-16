import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageHeader } from 'components/PageHeader';
import { useMemo } from 'react';
import { getIcon, icons } from 'services/iconLibrary';

/**
 * Renders the Title of the List with an Icon.
 * @param {Object} props
 * @param {IconDefinition} props.iconName - The name of the icon to render.
 * @param {string} props.name - Name of the list.
 */
export const Title = ({ name, iconName }) => {
  const icon = useMemo(() => getIcon(iconName), [iconName]);

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
