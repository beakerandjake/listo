const lists = [
    { name: 'Grocery', id: '1', iconName: 'cart-shopping', count: 42 },
    { name: 'Todo', id: '2', iconName: 'list-check', count: 0 },
    { name: 'Trips', id: '3', iconName: 'plane', count: 14 },
    { name: 'Purchases', id: '4', iconName: 'dollar-sign', count: 10 }
];

export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 0));
    return lists;
}

const items = [
    { id: 1, name: 'Bananas', quantity: 1 },
    { id: 2, name: 'Apples', quantity: 4 },
    { id: 3, name: 'Oranges', quantity: 5 },
    { id: 4, name: 'Pears', quantity: 2 },
    { id: 5, name: 'Peaches', quantity: 3 },
]

export async function getList(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return items;
}