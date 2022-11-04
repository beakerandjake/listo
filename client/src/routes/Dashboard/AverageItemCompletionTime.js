import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { StatCard } from './StatCard';
import humanize from 'humanize-duration';
import { useMemo } from 'react';

/**
 * Stat card which renders the average Item completion time.
 * @param {object} props
 * @param {number} props.timeInMs - The average completion time in milliseconds.
 */
export const AverageItemCompletionTime = ({ timeInMs = 0 }) => {
  const valueToDisplay = useMemo(
    () =>
      !timeInMs || timeInMs <= 0
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
