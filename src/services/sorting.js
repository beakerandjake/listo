import { compareAsc, parseISO } from "date-fns";

const sortDate = (lhs, rhs) => {
    return compareAsc(parseISO(lhs), parseISO(rhs));
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
        compareFn: sortDate
    },
    {
        itemKey: 'created',
        compareFn: sortDate
    },
    {
        itemKey: 'quantity',
        sortingFn: (lhs, rhs) => {
            return lhs - rhs;
        }
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

const nullOrUndefined = x => x === null || x === undefined;

export function sortItems(items, sortingKey, direction) {
    const sortInfo = sorting.find(x => x.itemKey === sortingKey);

    if (!sortInfo) {
        throw new Error(`Unknown Sort Key - ${sortingKey}`);
    }

    // some keys might be null on an item, so we don't want to sort those. 
    // divide the items into those which have a value for the key and those that don't. 
    const nullItems = items.filter(x => nullOrUndefined(x[sortInfo.itemKey]));
    const nonNullItems = items.filter(x => !nullItems.includes(x));

    const sortFn = sortInfo.sortingFn || defaultSortFn;
    nonNullItems.sort((lhs, rhs) => {
        const lhsValue = lhs[sortInfo.itemKey];
        const rhsValue = rhs[sortInfo.itemKey];
        return sortFn(lhsValue, rhsValue);
    });

    if (direction === sortingDirections.desc) {
        nonNullItems.reverse();
    }


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