import { add, startOfDay, startOfToday, startOfTomorrow, sub } from 'date-fns';
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
 * Returns a random due date which distributes between overdue, due today and due in the future.
 * @returns {Date}
 */
const randomDueDate = () => {
  const roll = Math.random();

  // 20% chance of being overdue
  if (roll < 0.2) {
    return randomDate(sub(startOfToday(), { weeks: 2 }), startOfToday());
  }

  // 40% chance of being due today
  if (roll < 0.6) {
    return startOfToday();
  }

  // 40% chance of being due in the future.
  return randomDate(startOfTomorrow(), add(startOfTomorrow(), { weeks: 2 }));
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
  const completed = Math.random() < 0.2;

  return {
    id,
    listId,
    name,
    note,
    completed,
    quantity: hasQuantity ? Math.floor(Math.random() * 4) + 1 : 1,
    createdDate: createdDate.toISOString(),
    dueDate: hasDueDate ? randomDueDate().toISOString() : null,
    completedDate: completed
      ? randomDate(createdDate, new Date()).toISOString()
      : null,
  };
};

let LISTS = [...lists];
let ITEMS = items.map((item, index) => createItem({ ...item, id: index }));

export const mockLists = () => LISTS;
export const mockItems = () => ITEMS;

export const setMockLists = (lists) => (LISTS = lists);
export const setMockItems = (items) => (ITEMS = items);
