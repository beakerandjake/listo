import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSort } from '@fortawesome/pro-solid-svg-icons';
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
import { FadeAndPopIn, SwitchTransition } from 'components/Transition';

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

const getSortingField = ({ itemKey = '', direction = '' } = {}) => SORTING_FIELDS
    .find(x => itemKey === x.itemKey && direction === x.sortingDirection);

/**
 * Dropdown which allows the user to select the active sorting field.
 * @param {Object} props - The props.
 * @param {object} props.activeSort - The current active sort. 
 * @param {function} props.onChange - Callback invoked when the user selects an active sort from the dropdown. 
 */
export function SortItemsDropdown({
    activeSort,
    onChange
}) {
    const [activeSortingField, setActiveSortingField] = useState(getSortingField(activeSort));

    // Any time the active sort prop changes, search our sorting fields
    // to find the element that corresponds to the active sort prop.
    useEffect(() => {
        setActiveSortingField(getSortingField(activeSort));
    }, [activeSort]);

    return (
        <StatefulMenu>
            {({ open, setOpen }) => (
                <ResponsiveMenu
                    open={open}
                    onClose={() => setOpen(false)}
                    trigger={(
                        <div>
                            <SwitchTransition switchKey={activeSortingField?.label || ''} as={FadeAndPopIn}>
                                <Button
                                    border="none"
                                    className="bg-inherit shadow-none enabled:hover:bg-white"
                                    onClick={() => setOpen(true)}
                                >
                                    <FontAwesomeIcon icon={faSort} />
                                    {!!activeSortingField && (
                                        <span>
                                            Sorted by <span className="font-semibold">{activeSortingField.label}</span>
                                        </span>
                                    )}
                                </Button>
                            </SwitchTransition>
                        </div>
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