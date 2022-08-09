import { faArrowDownAZ, faCheck, faSort } from '@fortawesome/free-solid-svg-icons';
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


export function SortingDropdown(props) {
    const sortingFields = [
        {
            itemKey: itemSortingFields.name,
            icon: faArrowDownAZ,
            text: "Name",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.dueDate,
            icon: faCalendarCheck,
            text: "Due Soonest",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.dueDate,
            icon: faCalendarCheck,
            text: "Due Latest",
            sortingDirection: sortingDirections.desc
        },
        {
            itemKey: itemSortingFields.created,
            icon: faCalendarPlus,
            text: "Oldest",
            sortingDirection: sortingDirections.asc
        },
        {
            itemKey: itemSortingFields.created,
            icon: faCalendarPlus,
            text: "Newest",
            sortingDirection: sortingDirections.desc
        },
        {
            itemKey: itemSortingFields.quantity,
            icon: faArrowDown91,
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
            <span className="inline sm:hidden">Sort</span>
            <span className="hidden sm:inline">
                Sort by <span className="font-semibold">{activeSortingField.text}</span>
            </span>
        </span>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button icon={faSort} text={!!activeSortingField ? triggerText : null} />
            </DropdownMenuTrigger>
            <DropdownMenuContent loop={true}>
                <DropdownMenuHeading title="Sort Items By" />
                {dropdownItems}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}