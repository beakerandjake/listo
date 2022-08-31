const lists = [
    {
        id: 1,
        name: 'Grocery',
        iconName: 'cart-shopping',
        hasQuantity: true,
        hasDueDate: false,
        items: [
            { id: 1, name: 'Bananas', quantity: 1, completed: true, created: new Date(2022, 6, 15).toISOString() },
            { id: 2, name: 'Apples', quantity: 4, completed: true, created: new Date(2022, 5, 22).toISOString() },
            { id: 3, name: 'Oranges', quantity: 5, completed: false, created: new Date(2022, 6, 29).toISOString() },
            { id: 4, name: 'Pears', quantity: 2, completed: false, created: new Date(2022, 6, 3).toISOString() },
            { id: 5, name: 'Bread Flour', quantity: 3, completed: false, created: new Date(2022, 1, 11).toISOString() },
            {
                id: 6,
                name: 'Scrubbing Bubbles Bathroom Cleaner',
                quantity: 1,
                completed: false,
                created: new Date(2022, 6, 15).toISOString(),
                dueDate: new Date(2022, 8, 15).toISOString(),
                note: 'one cool note!'
            },
            { id: 7, name: 'Grapes', quantity: 1, completed: true, created: new Date(2022, 6, 15).toISOString() },
            { id: 8, name: 'Blueberries', quantity: 4, completed: true, created: new Date(2022, 5, 22).toISOString() },
            { id: 9, name: 'Water', quantity: 5, completed: false, created: new Date(2022, 6, 29).toISOString() },
            { id: 10, name: 'Limes', quantity: 2, completed: false, created: new Date(2022, 6, 3).toISOString() },
            { id: 11, name: 'Lemons', quantity: 3, completed: false, created: new Date(2022, 1, 11).toISOString() },
        ]
    },
    {
        id: 2,
        name: 'Todo',
        iconName: 'list-check',
        hasQuantity: false,
        hasDueDate: true,
        items: [
            { id: 1, name: 'Get Groceries', quantity: 1, completed: true, created: new Date(2022, 1, 11).toISOString() },
            { id: 2, name: 'Pay Car Insurance', quantity: 1, completed: false, dueDate: new Date(2022, 6, 15).toISOString(), created: new Date(2022, 1, 11).toISOString() },
            { id: 3, name: 'Pull Weeds', quantity: 1, completed: false, dueDate: new Date(2022, 8, 15).toISOString(), created: new Date(2022, 1, 11).toISOString() }
        ]
    },
    {
        id: 3,
        name: 'Trips',
        iconName: 'plane',
        hasQuantity: false,
        hasDueDate: false,
        items: [
            { id: 1, name: 'Grand Canyon', quantity: 1, completed: false, created: new Date(2022, 2, 14).toISOString() },
            { id: 2, name: 'Death Valley', quantity: 1, completed: false, created: new Date(2022, 3, 6).toISOString() }
        ]
    },
    {
        id: 4,
        name: 'Purchases',
        iconName: 'dollar-sign',
        items: []
    }
];


export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 0));
    const toReturn = lists.map(x => ({
        name: x.name,
        id: x.id,
        iconName: x.iconName,
        count: x.items.length
    }));
    return toReturn;
}

export async function getList(id) {
    await new Promise(resolve => setTimeout(resolve, 250));

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        throw new Error(`Could not parse id: ${id}`);
    }

    const list = lists.find(x => x.id === parsedId);

    if (!list) {
        throw new Error(`Could not find list with id: ${id}`);
    }

    const toReturn = {
        iconName: list.iconName,
        name: list.name,
        items: list.items
    };

    return toReturn;
}

export async function setItemCompleted(listId, itemId, completed) {
    await new Promise(resolve => setTimeout(resolve, 250));
}