import { sortItems, itemSortingFields, sortingDirections } from './sorting';
import { faker } from '@faker-js/faker';

const ARRAY_LENGTH = 50;

const createRandomItem = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    quantity: faker.datatype.number({ min: 1, max: 25 }),
    completed: faker.datatype.boolean(),
    createdDate: faker.date.past(),
    dueDate:
      faker.helpers.maybe(() =>
        faker.date.between(
          '1900-01-01T00:00:00.000Z',
          '2022-12-31T00:00:00.000Z'
        )
      ) || null,
    note: faker.helpers.maybe(() => faker.lorem.sentence()) || null,
  };
};

const getRandomItems = (count) => {
  return [...Array(count)].map((x) => createRandomItem());
};

const sortNullLast = (desc) => {
  return (a, b) => {
    if (a === b) {
      return 0;
    }

    if (a === null) {
      return 1;
    }

    if (b === null) {
      return -1;
    }

    if (!desc) {
      return a < b ? -1 : 1;
    }

    return a < b ? 1 : -1;
  };
};

const testSortField = (itemKey, direction) => {
  test(`sort - ${itemKey} - ${direction}`, () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, itemKey, direction).map((x) => x[itemKey]);

    const correct = items
      .map((x) => x[itemKey])
      .sort(sortNullLast(direction === sortingDirections.desc));

    expect(sorted).toEqual(correct);
  });
};

Object.values(itemSortingFields).forEach((itemKey) => {
  testSortField(itemKey, sortingDirections.asc);
  testSortField(itemKey, sortingDirections.desc);
});
