const lists = [
    { name: 'Grocery', id: '1', iconName: 'cart-shopping', current: true },
    { name: 'Todo', id: '2', iconName: 'list-check', current: false },
    { name: 'Trips', id: '3', iconName: 'plane', current: false },
    { name: 'Purchases', id: '4', iconName: 'dollar-sign', current: false }
];

export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 0));
    return lists;
}