import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Compactly displays the values of various item properties.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @param {string=} props.className - Additional styles to apply to the component
 */
export const ItemStatusField = ({ icon, text, className }) => {
  return (
    <div className={className || 'text-gray-500'}>
      <FontAwesomeIcon icon={icon} size="sm" />
      <span className="text-xs font-medium pl-1">{text}</span>
    </div>
  );
};
