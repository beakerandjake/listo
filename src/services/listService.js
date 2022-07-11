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