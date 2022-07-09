

const lists = [
    { name: 'Grocery', id: '1', current: true },
    { name: 'Todo', id: '2', current: false },
    { name: 'Trips', id: '3', current: false },
    { name: 'Purchases', id: '4', current: false }
];

export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return lists;
}