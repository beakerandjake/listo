import { sortItems, sortingKeys, sortingDirections } from './sorting';
import { faker } from '@faker-js/faker';

const ARRAY_LENGTH = 50;

const createRandomItem = () => {
    return {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        quantity: faker.datatype.number({ min: 1, max: 25 }),
        completed: faker.datatype.boolean(),
        created: faker.date.past(),
        dueDate: faker.helpers.maybe(() => faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')) || null,
        note: faker.helpers.maybe(() => faker.lorem.sentence()) || null
    }
}

const getRandomItems = (count) => {
    return [...Array(count)].map(x => createRandomItem());
};

const sortNullLast = (sortFn, desc) => {
    return (a, b) => {
        if (a === b) {
            return 0
        }

        if (a === null) {
            return 1;
        }

        if (b === null) {
            return -1;
        }

        const result = sortFn(a, b);
        return desc ? result * -1 : result;
    }
}

test('sort items - by name - ascending', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.name, sortingDirections.asc)
        .map(x => x.name);

    const correct = items
        .map(x => x.name)
        .sort();

    expect(sorted).toEqual(correct);
});

test('sort items - by name - descending', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.name, sortingDirections.desc)
        .map(x => x.name);

    const correct = items
        .map(x => x.name)
        .sort()
        .reverse();

    expect(sorted).toEqual(correct);
});

test('sort items - by quantity - ascending', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.quantity, sortingDirections.asc)
        .map(x => x.quantity);

    const correct = items
        .map(x => x.quantity)
        .sort((a, b) => a - b);

    expect(sorted).toEqual(correct);
});

test('sort items - by quantity - descending', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.quantity, sortingDirections.desc)
        .map(x => x.quantity);

    const correct = items
        .map(x => x.quantity)
        .sort((a, b) => a - b)
        .reverse();

    expect(sorted).toEqual(correct);
});

test('sort items - by created - ascending', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.created, sortingDirections.asc)
        .map(x => x.created);

    const correct = items
        .map(x => x.created)
        .sort((a, b) => a - b);

    expect(sorted).toEqual(correct);
});

test('sort items - by created - desc', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.created, sortingDirections.desc)
        .map(x => x.created);

    const correct = items
        .map(x => x.created)
        .sort((a, b) => a - b)
        .reverse();

    expect(sorted).toEqual(correct);
});

test('sort items - by due date - asc', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.dueDate, sortingDirections.asc)
        .map(x => x.dueDate);

    const correct = items
        .map(x => x.dueDate)
        .sort(sortNullLast((a, b) => a - b));

    expect(sorted).toEqual(correct);
});

test('sort items - by due date - desc', () => {
    const items = getRandomItems(ARRAY_LENGTH);

    const sorted = sortItems(items, sortingKeys.dueDate, sortingDirections.desc)
        .map(x => x.dueDate);

    const correct = items
        .map(x => x.dueDate)
        .sort(sortNullLast((a, b) => a - b, true));

    expect(sorted).toEqual(correct);
});