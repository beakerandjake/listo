import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { useMemo } from 'react';

/**
 * Displays the Items Created Date in human readable format.
 * @param {object} props
 * @param {string} props.createdDate - a string in ISO Date format.  
 */
export const ItemCreatedDate = ({ createdDate }) => {
  // calculate the display text any time the date changes.
  const displayText = useMemo(() => {
    const parsed = parseISO(createdDate);

    if (!isValid(parsed)) {
      return null;
    }

    return `Created ${formatDistanceToNow(parsed, { addSuffix: true })}`;
  }, [createdDate]);

  if (!displayText) {
    return null;
  }

  return (
    <span className="text-sm font-semibold text-gray-500 select-none">
      {displayText}
    </span>
  );
};
