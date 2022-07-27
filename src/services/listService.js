// const lists = [
//     { name: 'Grocery', id: '1', iconName: 'cart-shopping', count: 42 },
//     { name: 'Todo', id: '2', iconName: 'list-check', count: 0 },
//     { name: 'Trips', id: '3', iconName: 'plane', count: 14 },
//     { name: 'Purchases', id: '4', iconName: 'dollar-sign', count: 10 }
// ];

const lists = [
    {
        id: 1,
        name: 'Grocery',
        iconName: 'cart-shopping',
        items: [
            { id: 1, name: 'Bananas', quantity: 1 },
            { id: 2, name: 'Apples', quantity: 4 },
            { id: 3, name: 'Oranges', quantity: 5 },
            { id: 4, name: 'Pears', quantity: 2 },
            { id: 5, name: 'Peaches', quantity: 3 },
        ]
    },
    {
        id: 2,
        name: 'Todo',
        iconName: 'list-check',
        items: [
            { id: 1, name: 'Get Groceries', quantity: 1 }
        ]
    },
    {
        id: 3,
        name: 'Trips',
        iconName: 'plane',
        items: [
            { id: 1, name: 'Grand Canyon', quantity: 1 },
            { id: 2, name: 'Death Valley', quantity: 1 }
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