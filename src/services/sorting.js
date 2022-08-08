import { compareAsc, isDate, parseISO } from "date-fns";

const SORTING_DIRECTIONS = {
    asc: 'asc',
    desc: 'desc'
};

const ITEM_SORTING_FIELDS = {
    name: 'name',
    dueDate: 'dueDate',
    quantity: 'quantity',
    created: 'created'
};

const CUSTOM_SORTING_FUNCTIONS = [
    // String Fields
    {
        itemKeys: [ITEM_SORTING_FIELDS.name],
        sortingFn: (lhs, rhs) => {
            if (typeof rhs !== 'string' || typeof rhs !== 'string') {
                throw new Error('lhs and rhs must be strings');
            }

            return lhs.localeCompare(rhs, undefined, { sensitivity: 'base' });
        }
    },
    // Date Fields
    {
        itemKeys: [ITEM_SORTING_FIELDS.dueDate, ITEM_SORTING_FIELDS.created],
        sortingFn: (lhs, rhs) => {
            const lhsDate = isDate(lhs) ? lhs : parseISO(lhs);
            const rhsDate = isDate(rhs) ? rhs : parseISO(rhs);
            return compareAsc(lhsDate, rhsDate);
        }
    },
];

const defaultSortingFn = (lhs, rhs) => {
    if (lhs < rhs) {
        return -1;
    }

    if (lhs > rhs) {
        return 1;
    }

    return 0;
};

// returns a function that wraps a sort fn that sorts ascending. 
// ensures that null / undefined items always sort last. 
// can invert the result of an ascending sort function if set to descending.
const nullAwareSortFnWrapper = (fn, desc) => {
    return (a, b) => {
        if (a === b) {
            return 0;
        }

        // ensure null always sort last.
        if (a === null || a === undefined) {
            return 1;
        }
        if (b === null || b === undefined) {
            return -1;
        }

        const result = fn(a, b);
        return desc ? result * -1 : result;
    };
}


export function sortItems(items, sortingKey, direction) {
    if (!Object.values(ITEM_SORTING_FIELDS).includes(sortingKey)) {
        throw new Error(`Unknown Sort Key - ${sortingKey}`);
    }

    const toReturn = [...items];

    const sortFn = nullAwareSortFnWrapper(
        CUSTOM_SORTING_FUNCTIONS.find(x => x.itemKeys.includes(sortingKey))?.sortingFn || defaultSortingFn,
        direction === SORTING_DIRECTIONS.desc
    );

    toReturn.sort((lhs, rhs) => sortFn(lhs[sortingKey], rhs[sortingKey]));

    return toReturn;
}

export const itemSortingFields = { ...ITEM_SORTING_FIELDS };
export const sortingDirections = { ...SORTING_DIRECTIONS };