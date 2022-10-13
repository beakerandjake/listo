import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { useEffect, useState } from 'react';
import { StatCard } from './StatCard';
import humanize from 'humanize-duration';
import { useErrorHandler } from 'react-error-boundary';
import { statsApi } from 'api';

/**
 * Stat card which renders the average Item completion time.
 */
export const AverageItemCompletionTime = () => {
  const [stat, setStat] = useState();
  const handleError = useErrorHandler();

  /**
   * Query the API for the data.
   */
  const loadData = () => {
    statsApi
      .getAverageItemCompletionTime()
      .then(({ timeInMs }) =>
        setStat(humanize(timeInMs, { delimiter: ' and ', largest: 2 }))
      )
      .catch(handleError);
  };

  useEffect(loadData, [handleError]);

  return (
    <StatCard
      name="Average Completion Time"
      stat={stat}
      variant="primary"
      size="sm"
      icon={faClock}
    />
  );
};
