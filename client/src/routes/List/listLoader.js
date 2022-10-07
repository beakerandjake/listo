import { itemApi, listApi } from 'api';

/**
 * Loader function used by react-router to load the data needed to render
 * the List component.
 * @param {Object} params
 * @param {number} props.id - The id of the list.
 */
export const listLoader = async ({ params }) => {
  const [list, items] = await Promise.all([
    listApi.getList(params.listId),
    itemApi.getItems(params.listId),
  ]);

  return { list, items };
};
