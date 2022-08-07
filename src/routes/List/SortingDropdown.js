import { faArrowUp19, faArrowUpAZ, faCalendarCheck, faCalendarDay, faCalendarPlus, faSort } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from 'components/Button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { sortingKeys } from 'services/sorting';

export function SortingDropdown(props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button icon={faSort} text="Sort" />
            </DropdownMenuTrigger>
            <DropdownMenuContent loop={true}>
                <DropdownMenuHeading title="Sort Items By" />
                <DropdownMenuItem icon={faArrowUpAZ} text="Name" onClick={() => props.onChooseSort(sortingKeys.name)} />
                <DropdownMenuItem icon={faCalendarCheck} text="Due Date" onClick={() => props.onChooseSort(sortingKeys.dueDate, 'desc')} />
                <DropdownMenuItem icon={faCalendarPlus} text="Creation Date" onClick={() => props.onChooseSort(sortingKeys.created)} />
                <DropdownMenuItem icon={faArrowUp19} text="Quantity" onClick={() => props.onChooseSort(sortingKeys.quantity, 'desc')} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}