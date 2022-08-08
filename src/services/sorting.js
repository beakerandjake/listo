import { faArrowDown91, faArrowUpAZ, faCalendarCheck, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { compareAsc, isDate, parseISO } from "date-fns";

export const sortingDirections = {
    asc: 'asc',
    desc: 'desc'
};

const sortDate = (lhs, rhs) => {
    const lhsDate = isDate(lhs) ? lhs : parseISO(lhs);
    const rhsDate = isDate(rhs) ? rhs : parseISO(rhs);
    return compareAsc(lhsDate, rhsDate);
}

const sorting = [
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
        sortingFn: sortDate
    },
    {
        itemKey: 'created',
        displayName: 'Creation Date',
        icon: faCalendarPlus,
        sortingFn: sortDate
    },
    {
        itemKey: 'quantity',
        displayName: 'Quantity',
        icon: faArrowDown91,
        defaultSortingDirection: sortingDirections.desc,
        sortingFn: null
    }
];

const defaultSortFn = (lhs, rhs) => {
    if (lhs < rhs) {
        return -1;
    }

    if (lhs > rhs) {
        return 1;
    }

    return 0;
};

const nullOrUndefined = value => {
    return value === null || value === undefined;
}

// returns a function that wraps a sort fn that sorts ascending. 
// ensures that null / undefined items always sort last. 
// can invert the result of an ascending sort function if set to descending.
const nullAwareDescendingWrapper = (fn, desc) => {
    return (a, b) => {
        if (a === b) {
            return 0;
        }

        // ensure null always sort last.
        if (nullOrUndefined(a)) {
            return 1;
        }
        if (nullOrUndefined(b)) {
            return -1;
        }

        const result = fn(a, b);
        return desc ? result * -1 : result;
    };
}


export function sortItems(items, sortingKey, direction) {
    const sortInfo = sorting.find(x => x.itemKey === sortingKey);

    if (!sortInfo) {
        throw new Error(`Unknown Sort Key - ${sortingKey}`);
    }
    const toReturn = [...items];

    const sortFn = nullAwareDescendingWrapper(sortInfo.sortingFn || defaultSortFn, direction === sortingDirections.desc);

    toReturn.sort((lhs, rhs) => {
        const lhsValue = lhs[sortInfo.itemKey];
        const rhsValue = rhs[sortInfo.itemKey];
        return sortFn(lhsValue, rhsValue);
    });

    return toReturn;
}

export const itemSortingFields = sorting.map(({ itemKey, displayName, icon, defaultSortingDirection }) => ({
    itemKey,
    displayName,
    icon,
    defaultSortingDirection: defaultSortingDirection || sortingDirections.asc
}));

const test = sorting.reduce((acc, elem) => {
    acc[elem.itemKey] = {
        itemKey: elem.itemKey,
        displayName: elem.displayName,
        icon: elem.icon,
        defaultSortingDirection: elem.defaultSortingDirection || sortingDirections.asc
    };
    return acc;
}, {});

console.log(test);