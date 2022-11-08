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
  faCat,
  faBookmark,
  faBook,
  faCode,
  faBurgerSoda,
  faGamepad,
  faDumbbell,
  faPersonWalking,
  faHeart,
  faCalendar,
  faCar,
  faHeadphones,
  faPrint,
  faMoneyBill,
  faTree,
  faComputer,
} from '@fortawesome/pro-regular-svg-icons';

const ICONS = [
  faCheck,
  faDollar,
  faHome,
  faShoppingCart,
  faStore,
  faListCheck,
  faPlane,
  faPlus,
  faGift,
  faCat,
  faBookmark,
  faBook,
  faCode,
  faBurgerSoda,
  faGamepad,
  faDumbbell,
  faPersonWalking,
  faHeart,
  faCalendar,
  faCar,
  faHeadphones,
  faPrint,
  faMoneyBill,
  faTree,
  faComputer,
];

const fallbackIcon = faCheck;

export function getIcon(iconName) {
  return ICONS.find((x) => x.iconName === iconName) || fallbackIcon;
}

export const icons = [...ICONS];
