import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSort } from '@fortawesome/free-solid-svg-icons';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { Button } from 'components/Button';
import { MenuHeader, MenuItem, MenuTitle, ResponsiveMenu, ScrollableMenuContent } from 'components/Menu';

export function SortingDropdown(props) {
    const [open, setOpen] = useState(false);

    const sortingFields = [
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

    const activeSortingField = sortingFields.find(({ itemKey, sortingDirection }) =>
        props.activeSort.itemKey === itemKey && props.activeSort.direction === sortingDirection
    );

    const menuItems = sortingFields
        .map(x => {
            const { itemKey, sortingDirection, ...rest } = x;
            const onClick = () => {
                setOpen(false);
                props.onChooseSort({ itemKey, direction: sortingDirection })
            };
            const reactKey = `${itemKey}-${sortingDirection}`;

            if (x === activeSortingField) {
                return (
                    <MenuItem key={reactKey} onClick={onClick} {...rest}>
                        <FontAwesomeIcon icon={faCheck} />
                    </MenuItem>
                );
            }

            return <MenuItem key={reactKey} onClick={onClick} {...rest} />
        });

    return (
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
                {menuItems}
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}