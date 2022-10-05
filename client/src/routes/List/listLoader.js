import { itemApi, listApi } from 'api';

/**
 * Loader function used by react-router to load the data needed to render
 * the List component.
 * @param {Object} params
 * @param {number} props.id - The id of the list.
 */
export const listLoader = async ({ params }) => {
  const result = await Promise.all([
    listApi.getList(params.id),
    itemApi.getItems(params.id),
  ]);

  return {
    list: result[0],
    items: result[1],
  };
};
