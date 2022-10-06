import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Allows global access to the list data which populates the sidebar.
 * More importantly, allows the list item counts to be updated and have
 * this change be reflected in the sidebar.
 * @returns {[object[], function(number,number) : void]}
 */
export const useSidebarLists = () => {
  // start with the data from the roots react-router loader.
  const rootLists = useRouteLoaderData('root');
  const handleError = useErrorHandler();

  // create an internal state from the root data
  // this will allow users to modify the item count of the lists
  const [lists, setLists] = useState(rootLists);

  // any time the root data changes, ensure we update our lists.
  useEffect(() => {
    setLists(rootLists);
  }, [rootLists]);

  // allow users to modify the item count of a specific list.
  const updateItemCount = (id, itemCount) => {
    if (itemCount < 0) {
      handleError(
        new Error(`Attempted to set negative itemCount on list: ${id}`)
      );
    }
    setLists(lists.map((x) => (x.id === id ? { ...x, itemCount } : x)));
  };

  return [lists, updateItemCount];
};
