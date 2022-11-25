import { add, startOfDay, sub } from 'date-fns';

const randomDate = (startDate, endDate) => {
  return startOfDay(
    new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
  );
};

const createItem = (item, listId, itemIndex, hasQuantity, hasDueDate) => {
  const createdDate = randomDate(sub(new Date(), { months: 1 }), new Date());
  const dueDate = randomDate(
    sub(createdDate, { weeks: 1 }),
    add(createdDate, { months: 1 })
  );
  const completedDate =
    Math.random() <= 0.3 ? randomDate(createdDate, dueDate) : null;

  return {
    id: listId + itemIndex,
    listId,
    quantity: hasQuantity ? Math.floor(Math.random() * 15) + 1 : 1,
    createdDate: createdDate.toISOString(),
    dueDate: hasDueDate ? dueDate.toISOString() : null,
    completedDate:
      hasDueDate && completedDate ? completedDate.toISOString() : null,
    completed: !!completedDate,
    ...item,
  };
};

const MOCK_DATA = [
  {
    id: 1,
    name: 'Todo',
    iconName: 'check',
    hasDueDate: true,
    hasQuantity: false,
    items: [
      { name: 'Pick up Groceries' },
      { name: 'Mail Birthday Card' },
      { name: 'Doctors Appointment' },
      { name: 'Car Oil Change' },
      { name: 'Clean out fridge' },
      { name: 'Laundry' },
      { name: 'Return Library Books' },
      { name: 'Cancel Subscription' },
    ],
  },
  {
    id: 2,
    name: 'Grocery',
    iconName: 'cart-shopping',
    hasDueDate: false,
    hasQuantity: true,
    items: [{ name: 'Apples' }, { name: 'Bananas' }],
  },
];

export const lists = MOCK_DATA.map((list) => ({
  id: list.id,
  name: list.name,
  iconName: list.iconName,
  items: list.items.map((item, index) =>
    createItem(item, list.id, index, list.hasQuantity, list.hasDueDate)
  ),
}));

