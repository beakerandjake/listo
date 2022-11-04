import { useMemo } from 'react';
import humanize from 'humanize-duration';
import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { StatCard } from './StatCard';

/**
 * Stat card which renders the average Item completion time.
 * @param {object} props
 * @param {number} props.timeInMs - The average completion time in milliseconds.
 */
export const AverageItemCompletionTime = ({ timeInMs = 0 }) => {
  const valueToDisplay = useMemo(
    () =>
      timeInMs <= 0
        ? 'N/A'
        : humanize(timeInMs, { delimiter: ' and ', largest: 2 }),
    [timeInMs]
  );

  return (
    <StatCard
      name="Average Completion Time"
      stat={valueToDisplay}
      variant="primary"
      size="sm"
      icon={faClock}
    />
  );
};
