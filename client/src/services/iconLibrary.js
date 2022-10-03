import {
  faCheck,
  faDollar,
  faGift,
  faHome,
  faListCheck,
  faPlane,
  faPlus,
  faShoppingCart,
  faStore,
} from '@fortawesome/pro-light-svg-icons';

const icons = [
  faCheck,
  faDollar,
  faHome,
  faShoppingCart,
  faStore,
  faListCheck,
  faPlane,
  faPlus,
  faGift,
];

const fallbackIcon = faCheck;

export function getIcon(iconName) {
  return icons.find((x) => x.iconName === iconName) || fallbackIcon;
}
