import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { useMemo } from 'react';

/**
 * Displays an items date in human readable format.
 * @param {object} props
 * @param {string} props.prefix - prefix string to use when displaying the date.
 * @param {string} props.date - The ISO date string to format and display.
 */
export const ItemFormattedDateLabel = ({
  date,
  prefix = '',
  ...props
}) => {
  // calculate the display text any time the date changes.
  const displayText = useMemo(() => {
    const parsed = parseISO(date);

    if (!isValid(parsed)) {
      return null;
    }

    return `${prefix} ${formatDistanceToNow(parsed, {
      addSuffix: true,
    })}`;
  }, [prefix, date]);

  if (!displayText) {
    return null;
  }

  return <span {...props}>{displayText}</span>;
};
