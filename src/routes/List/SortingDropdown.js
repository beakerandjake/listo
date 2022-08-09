import { faArrowDownAZ, faCalendar, faCalendarDays, faCheck, faClock, faSort, faTriangleCircleSquare } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from 'components/Button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { faArrowDown91, faArrowUpAZ, faCalendarCheck, faCalendarPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';


export function SortingDropdown(props) {
    const sortingFields = [
        {
            itemKey: itemSortingFields.name,
            text: "Name",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.dueDate,
            text: "Due Soonest",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.dueDate,
            text: "Due Latest",
            sortingDirection: sortingDirections.desc
        },
        {
            itemKey: itemSortingFields.created,
            text: "Oldest",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.created,
            text: "Newest",
            sortingDirection: sortingDirections.desc
        },
        {
            itemKey: itemSortingFields.quantity,
            text: "Quantity",
            sortingDirection: sortingDirections.desc
        }
    ];

    const activeSortingField = sortingFields.find(({ itemKey, sortingDirection }) =>
        props.activeSort.itemKey === itemKey && props.activeSort.direction === sortingDirection
    );

    const dropdownItems = sortingFields.map(x => {
        const { itemKey, sortingDirection, ...rest } = x;
        const onClick = () => props.onChooseSort({ itemKey, direction: sortingDirection });
        const reactKey = `${itemKey}-${sortingDirection}`;

        if (x === activeSortingField) {
            return (
                <DropdownMenuItem key={reactKey} onClick={onClick} {...rest}>
                    <FontAwesomeIcon icon={faCheck} />
                </DropdownMenuItem>
            );
        }

        return <DropdownMenuItem key={reactKey} onClick={onClick} {...rest} />
    });

    // Render different trigger text based on size of viewport 
    const triggerText = (
        <span>
            <span className="inline sm:hidden">Sort Items</span>
            <span className="hidden sm:inline">
                Sorted by <span className="font-semibold">{activeSortingField.text}</span>
            </span>
        </span>
    );

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    icon={faSort}
                    text={!!activeSortingField ? triggerText : null}
                    className="border-none bg-inherit shadow-none enabled:hover:bg-white without-ring"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent loop={true} onCloseAutoFocus={e => e.preventDefault()}>
                <DropdownMenuHeading title="Sort Items By" />
                {dropdownItems}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}