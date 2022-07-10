import {
    faCheck,
    faDollar,
    faGift,
    faListCheck,
    faPlane,
    faShoppingCart,
    faStore
} from '@fortawesome/free-solid-svg-icons';

const icons = [
    faCheck,
    faDollar,
    faShoppingCart,
    faStore,
    faListCheck,
    faPlane,
    faGift,
];

const fallbackIcon = faCheck;

export function getIcon(iconName) {
    return icons.find(x => x.iconName === iconName) || fallbackIcon;
}