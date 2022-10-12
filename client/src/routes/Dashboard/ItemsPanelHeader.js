import { Badge } from 'components/Badge';

/**
 * Header which also renders a badge showing the item count.
 * @param {object} props
 * @param {string} props.title - Text of the header
 * @param {number} props.itemCount - Number of items to render in the badge.
 * @param {string} props.variant - Badge variant name.
 */
export const ItemPanelHeader = ({ title, itemCount, variant }) => {
  return (
    <div className="flex">
      <h3 className="mr-2 text-lg font-medium leading-6 text-gray-900">
        {title}
      </h3>
      <Badge variant={variant}>{itemCount}</Badge>
    </div>
  );
};
