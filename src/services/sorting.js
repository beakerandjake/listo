import { faArrowDown91, faArrowUpAZ, faCalendarCheck, faCalendarPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { compareAsc, isDate, parseISO } from "date-fns";

export const sortingDirections = {
    asc: 'asc',
    desc: 'desc'
};

const DEFAULT_SORTING_DIRECTION = sortingDirections.asc;

const SORT_DATE_FN = (lhs, rhs) => {
    const lhsDate = isDate(lhs) ? lhs : parseISO(lhs);
    const rhsDate = isDate(rhs) ? rhs : parseISO(rhs);
    return compareAsc(lhsDate, rhsDate);
}

const ITEM_SORTS = [
    {
        itemKey: 'name',
        displayName: 'Name',
        icon: faArrowUpAZ,
        sortingFn: (lhs, rhs) => {
            if (typeof rhs !== 'string' || typeof rhs !== 'string') {
                throw new Error('lhs and rhs must be strings');
            }

            return lhs.localeCompare(rhs, undefined, { sensitivity: 'base' });
        }
    },
    {
        itemKey: 'dueDate',
        displayName: 'Due Date',
        icon: faCalendarCheck,
        sortingFn: SORT_DATE_FN
    },
    {
        itemKey: 'created',
        displayName: 'Creation Date',
        icon: faCalendarPlus,
        sortingFn: SORT_DATE_FN
    },
    {
        itemKey: 'quantity',
        displayName: 'Quantity',
        icon: faArrowDown91,
        defaultSortingDirection: sortingDirections.desc,
        sortingFn: null
    }
];

const DEFAULT_SORT_FN = (lhs, rhs) => {
    if (lhs < rhs) {
        return -1;
    }

    if (lhs > rhs) {
        return 1;
    }

    return 0;
};

const NULL_OR_UNDEFINED = value => {
    return value === null || value === undefined;
}

// returns a function that wraps a sort fn that sorts ascending. 
// ensures that null / undefined items always sort last. 
// can invert the result of an ascending sort function if set to descending.
const NULL_AWARE_SORT_WRAPPER = (fn, desc) => {
    return (a, b) => {
        if (a === b) {
            return 0;
        }

        // ensure null always sort last.
        if (NULL_OR_UNDEFINED(a)) {
            return 1;
        }
        if (NULL_OR_UNDEFINED(b)) {
            return -1;
        }

        const result = fn(a, b);
        return desc ? result * -1 : result;
    };
}


export function sortItems(items, sortingKey, direction) {
    const sortInfo = ITEM_SORTS.find(x => x.itemKey === sortingKey);

    if (!sortInfo) {
        throw new Error(`Unknown Sort Key - ${sortingKey}`);
    }
    const toReturn = [...items];

    const sortFn = NULL_AWARE_SORT_WRAPPER(sortInfo.sortingFn || DEFAULT_SORT_FN, direction === sortingDirections.desc);

    toReturn.sort((lhs, rhs) => {
        const lhsValue = lhs[sortInfo.itemKey];
        const rhsValue = rhs[sortInfo.itemKey];
        return sortFn(lhsValue, rhsValue);
    });

    return toReturn;
}

export const itemSortingFields = ITEM_SORTS
    .map(({ itemKey, displayName, icon, defaultSortingDirection }) => ({
        itemKey,
        displayName,
        icon,
        defaultSortingDirection: defaultSortingDirection || DEFAULT_SORTING_DIRECTION
    }));

export const defaultItemSortingField = (({ itemKey, defaultSortingDirection }) => ({
    itemKey,
    sortingDirection: defaultSortingDirection || DEFAULT_SORTING_DIRECTION
}))(ITEM_SORTS.find(x => x.itemKey === 'created'));
