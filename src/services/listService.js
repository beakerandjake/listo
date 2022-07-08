
import { ClipboardListIcon, CurrencyDollarIcon, GlobeIcon, ShoppingCartIcon } from '@heroicons/react/outline';

const lists = [
    { name: 'Grocery', id: '1', icon: ShoppingCartIcon, current: true },
    { name: 'Todo', id: '2', icon: ClipboardListIcon, current: false },
    { name: 'Trips', id: '3', icon: GlobeIcon, current: false },
    { name: 'Purchases', id: '4', icon: CurrencyDollarIcon, current: false }
];

export async function getLists() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return lists;
}