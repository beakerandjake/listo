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
  const dueDate = randomDate(createdDate, add(new Date(), { weeks: 2 }));
  const completedDate =
    Math.random() <= 0.3 ? randomDate(createdDate, dueDate) : null;
  const completed = hasDueDate && !!completedDate ? true : Math.random() < 0.2;

  return {
    id: listId + itemIndex,
    listId,
    quantity: hasQuantity ? Math.floor(Math.random() * 4) + 1 : 1,
    createdDate: createdDate.toISOString(),
    dueDate: hasDueDate ? dueDate.toISOString() : null,
    completedDate:
      hasDueDate && completedDate ? completedDate.toISOString() : null,
    completed: completed,
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
      { name: 'Pick up groceries' },
      { name: 'Mail birthday card' },
      { name: 'Doctors appointment', note: 'Bring insurance card' },
      { name: 'Car oil change', note: "Don't forget coupon" },
      { name: 'Clean out fridge' },
      { name: 'Laundry' },
      { name: 'Return Library books' },
      { name: 'Cancel subscription' },
      { name: 'Pick weeds' },
      { name: 'Call Grandma' },
      { name: 'Vacuum' },
      { name: 'Brush cat' },
      { name: 'Dust out computer' },
      { name: 'Clean bathroom' },
      { name: 'Wash sheets' },
      { name: 'Leafblower backyard' },
      { name: 'Fill bird feeder' },
    ],
  },
  {
    id: 2,
    name: 'Grocery',
    iconName: 'cart-shopping',
    hasDueDate: false,
    hasQuantity: true,
    items: [
      { name: 'Apples' },
      { name: 'Bananas' },
      { name: 'Coffee' },
      { name: 'Creamer' },
      { name: 'Celery' },
      { name: 'Oranges' },
      { name: 'Milk' },
      { name: 'Salad' },
      { name: 'Cucumber' },
      { name: 'Tomato' },
      { name: 'Avocado' },
      { name: 'Bread' },
      { name: 'Bagel' },
      { name: 'Garlic' },
      { name: 'Frozen peas' },
      { name: 'Frozen corn' },
      { name: 'Canned garbanzo beans' },
      { name: 'Penne pasta', note: 'Whole Grain' },
      { name: 'Crackers' },
      { name: 'Cookies', note: 'Chocolate chip' },
    ],
  },
  {
    id: 3,
    name: 'Trips',
    iconName: 'plane',
    hasDueDate: false,
    hasQuantity: false,
    items: [
      {
        name: 'Joshua Tree National Park',
        note: 'Stay at Jumbo Rocks Campground',
      },
      { name: 'Chichen Itza' },
      { name: 'Grand Canyon National Park', note: 'Hike to Shoshone Point' },
      { name: 'Canyon de Chelly' },
      { name: 'Monument Valley' },
      { name: 'Organ Pipe Cactus National Monument' },
      { name: 'Saguaro National Park' },
      { name: 'Petrified Forest National Park', note: 'Check out Blue Mesa' },
      { name: 'Sunset Crater' },
      { name: 'Yellowstone National Park' },
      { name: 'Yosemite National Park' },
      { name: 'Sequoia National Park' },
      {
        name: 'Death Valley National Park',
        note: 'Must see Artists Pallet Scenic Drive',
      },
    ],
  },
  {
    id: 4,
    name: 'Purchases',
    iconName: 'dollar',
    hasDueDate: false,
    hasQuantity: false,
    items: [
      {
        name: 'New Dishwasher',
        note: 'KitchenAid 44dBA w/ third rack',
      },
      { name: 'New lightbulb for kitchen' },
      { name: '4k UHD blu ray player' },
      { name: 'Container for bird seed' },
      { name: 'Door mat' },
      { name: 'Cover for patio furniture' },
      { name: 'Cat tower' },
      { name: 'Water filter' },
      { name: 'Spanish flash cards' },
    ],
  },
];

export const mockData = MOCK_DATA.map((list) => ({
  id: list.id,
  name: list.name,
  iconName: list.iconName,
  items: list.items.map((item, index) =>
    createItem(item, list.id, index, list.hasQuantity, list.hasDueDate)
  ),
}));
