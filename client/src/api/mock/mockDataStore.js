import { add, startOfDay, sub } from 'date-fns';
import lists from './lists.json';
import items from './items.json';

/**
 * Returns a random date between the start and end dates.
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Date}
 */
const randomDate = (startDate, endDate) => {
  return startOfDay(
    new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
  );
};

/**
 * Given an item template object, will return an item with random date values
 * relative to the current date. This keeps the static, mock data "current" instead
 * of using hard coded dates which will eventually all be in the past.
 * @param {Object}
 * @returns {Object}
 */
const createItem = ({
  id,
  listId,
  name,
  note,
  hasDueDate = false,
  hasQuantity = false,
}) => {
  const createdDate = randomDate(sub(new Date(), { months: 1 }), new Date());
  const dueDate = randomDate(createdDate, add(new Date(), { weeks: 2 }));
  const completedDate =
    Math.random() <= 0.3 ? randomDate(createdDate, dueDate) : null;
  const completed = hasDueDate && !!completedDate ? true : Math.random() < 0.2;

  return {
    id,
    listId,
    name,
    note,
    quantity: hasQuantity ? Math.floor(Math.random() * 4) + 1 : 1,
    createdDate: createdDate.toISOString(),
    dueDate: hasDueDate ? dueDate.toISOString() : null,
    completedDate:
      hasDueDate && completedDate ? completedDate.toISOString() : null,
    completed: completed,
  };
};

export const getMockData = () => {
  return [];
};

export const getList = (listId) => {
  return null;
};

let LISTS = [...lists];
let ITEMS = items.map((item, index) => createItem({ ...item, id: index }));

console.log('items', ITEMS);

export const getLists = () => [...LISTS];
export const getItems = () => [...ITEMS];

export const setLists = (lists) => (LISTS = [...lists]);
export const setItems = (items) => (ITEMS = [...items]);
