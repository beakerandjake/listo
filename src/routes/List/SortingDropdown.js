import { faSort } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from 'components/Button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { itemSortingFields } from 'services/sorting';
import { faArrowDown91, faArrowUpAZ, faCalendarCheck, faCalendarPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";


export function SortingDropdown(props) {
    const sortingButtons = itemSortingFields.map(x => (
        <DropdownMenuItem
            key={x.itemKey}
            icon={x.icon}
            text={x.displayName}
            onClick={() => props.onChooseSort({ itemKey: x.itemKey, sortingDirection: x.defaultSortingDirection })}
        />
    ));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button icon={faSort} text="Sort" />
            </DropdownMenuTrigger>
            <DropdownMenuContent loop={true}>
                <DropdownMenuHeading title="Sort Items By" />
                {sortingButtons}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}