const lists = [
    { name: 'Grocery', id: '1', iconName: 'cart-shopping' },
    { name: 'Todo', id: '2', iconName: 'list-check' },
    { name: 'Trips', id: '3', iconName: 'plane' },
    { name: 'Purchases', id: '4', iconName: 'dollar-sign' }
];

export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 0));
    return lists;
}