import { useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSort } from '@fortawesome/free-solid-svg-icons';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { Button } from 'components/Button';
import {
    MenuHeader,
    MenuItem,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent,
    StatefulMenu
} from 'components/Menu';

const SORTING_FIELDS = [
    {
        itemKey: itemSortingFields.name,
        label: "Name",
        sortingDirection: sortingDirections.asc
    },
    {
        itemKey: itemSortingFields.dueDate,
        label: "Due Soonest",
        sortingDirection: sortingDirections.asc
    },
    {
        itemKey: itemSortingFields.dueDate,
        label: "Due Latest",
        sortingDirection: sortingDirections.desc
    },
    {
        itemKey: itemSortingFields.created,
        label: "Oldest",
        sortingDirection: sortingDirections.asc
    },
    {
        itemKey: itemSortingFields.created,
        label: "Newest",
        sortingDirection: sortingDirections.desc
    },
    {
        itemKey: itemSortingFields.quantity,
        label: "Quantity",
        sortingDirection: sortingDirections.desc
    }
];

/**
 * Dropdown which allows the user to select the active sorting field.
 * @param {Object} props - The props.
 * @param {object} props.activeSort - The current active sort. 
 * @param {function} props.onChange - Callback invoked when the user selects an active sort from the dropdown. 
 */
export function ListSortingDropdown({
    activeSort,
    onChange
}) {
    const [activeSortingField, setActiveSortingField] = useState(null);

    // Any time the active sort prop changes, search our sorting fields
    // to find the element that corresponds to the active sort prop.
    useLayoutEffect(() => {
        const result = SORTING_FIELDS.find(({ itemKey, sortingDirection }) =>
            activeSort.itemKey === itemKey && activeSort.direction === sortingDirection
        );

        setActiveSortingField(result);
    }, [activeSort]);

    return (
        <StatefulMenu>
            {({ open, setOpen }) => (
                <ResponsiveMenu
                    open={open}
                    onClose={() => setOpen(false)}
                    trigger={(
                        <Button
                            border="none"
                            className="bg-inherit shadow-none enabled:hover:bg-white"
                            onClick={() => setOpen(true)}
                        >
                            <FontAwesomeIcon icon={faSort} />
                            {!!activeSortingField && (
                                <span>
                                    <span className="inline sm:hidden">Sort Items</span>
                                    <span className="hidden sm:inline">
                                        Sorted by <span className="font-semibold">{activeSortingField.label}</span>
                                    </span>
                                </span>
                            )}
                        </Button>
                    )}
                    desktopPlacement='bottom-end'
                >
                    <MenuHeader className="flex items-center justify-center">
                        <MenuTitle>Sort Items By</MenuTitle>
                    </MenuHeader>
                    <ScrollableMenuContent>
                        {SORTING_FIELDS.map(x => (
                            <MenuItem
                                key={`${x.itemKey}-${x.sortingDirection}`}
                                onClick={() => {
                                    setOpen(false);
                                    onChange({ itemKey: x.itemKey, direction: x.sortingDirection })
                                }}
                                label={x.label}
                            >
                                {/* Add a check to the menu item if it's the active sorting field. */}
                                {x === activeSortingField && <FontAwesomeIcon icon={faCheck} />}
                            </MenuItem>
                        ))}
                    </ScrollableMenuContent>
                </ResponsiveMenu>
            )}
        </StatefulMenu>
    )
}