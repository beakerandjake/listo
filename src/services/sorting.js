import { compareAsc, isDate, parseISO } from "date-fns";

const sortDate = (lhs, rhs) => {
    const lhsDate = isDate(lhs) ? lhs : parseISO(lhs);
    const rhsDate = isDate(rhs) ? rhs : parseISO(rhs);
    return compareAsc(lhsDate, rhsDate);
}

const sorting = [
    {
        itemKey: 'name',
        sortingFn: (lhs, rhs) => {
            if (typeof rhs !== 'string' || typeof rhs !== 'string') {
                throw new Error('lhs and rhs must be strings');
            }

            return lhs.localeCompare(rhs, undefined, { sensitivity: 'base' });
        }
    },
    {
        itemKey: 'dueDate',
        sortingFn: sortDate
    },
    {
        itemKey: 'created',
        sortingFn: sortDate
    },
    {
        itemKey: 'quantity',
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

// returns a function that can invert the result of an ascending sort function if set to descending.
const descendingWrapper = (fn, desc) => {
    return (...args) => {
        const result = fn(...args);
        return desc ? result * -1 : result;
    };
}

const nullOrUndefined = value => {
    return value === null || value === undefined;
}

export function sortItems(items, sortingKey, direction) {
    const sortInfo = sorting.find(x => x.itemKey === sortingKey);

    if (!sortInfo) {
        throw new Error(`Unknown Sort Key - ${sortingKey}`);
    }

    // some keys might be null on an item, so we don't want to sort those. 
    // divide the items into those which have a value for the key and those that don't. 
    const nullItems = items.filter(x => nullOrUndefined(x[sortInfo.itemKey]));
    const nonNullItems = items.filter(x => !nullItems.includes(x));

    const sortFn = descendingWrapper(sortInfo.sortingFn || defaultSortFn, direction === sortingDirections.desc);

    nonNullItems.sort((lhs, rhs) => {
        const lhsValue = lhs[sortInfo.itemKey];
        const rhsValue = rhs[sortInfo.itemKey];
        return sortFn(lhsValue, rhsValue);
    });

    return [...nonNullItems, ...nullItems];
}

export const sortingKeys = sorting.reduce((acc, elem) => {
    acc[elem.itemKey] = elem.itemKey;
    return acc;
}, {});

export const sortingDirections = {
    asc: 'asc',
    desc: 'desc'
};