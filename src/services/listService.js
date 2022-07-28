const lists = [
    {
        id: 1,
        name: 'Grocery',
        iconName: 'cart-shopping',
        hasQuantity: true,
        hasDueDate: false,
        items: [
            { id: 1, name: 'Bananas', quantity: 1, completed: false },
            { id: 2, name: 'Apples', quantity: 4, completed: false },
            { id: 3, name: 'Oranges', quantity: 5, completed: false },
            { id: 4, name: 'Pears', quantity: 2, completed: false },
            { id: 5, name: 'Bread Flour', quantity: 3, completed: false },
            { id: 6, name: 'Scrubbing Bubbles Bathroom Cleaner', quantity: 1, completed: false },
        ]
    },
    {
        id: 2,
        name: 'Todo',
        iconName: 'list-check',
        hasQuantity: false,
        hasDueDate: true,
        items: [
            { id: 1, name: 'Get Groceries', quantity: 1, completed: true }
        ]
    },
    {
        id: 3,
        name: 'Trips',
        iconName: 'plane',
        hasQuantity: false,
        hasDueDate: false,
        items: [
            { id: 1, name: 'Grand Canyon', quantity: 1, completed: false },
            { id: 2, name: 'Death Valley', quantity: 1, completed: false }
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
        name: list.name,
        items: list.items
    };

    return toReturn;
}

export async function setItemCompleted(listId, itemId, completed) {
    await new Promise(resolve => setTimeout(resolve, 250));
}