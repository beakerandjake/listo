import { itemApi } from 'api';
import { defer } from 'react-router-dom';

/**
 * Loader function used by react-router to load the data needed to render
 * the Dashboard component.
 * @param {Object} params
 * @param {number} props.id - The id of the list.
 */
export const dashboardLoader = async () => {
  const itemsDueToday = itemApi.getItemsDueToday();
  const overdueItems = itemApi.getOverdueItems();

  return defer({ itemsDueToday, overdueItems });
};
