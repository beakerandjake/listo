import { faSort } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from 'components/Button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { itemSortingFields, sortingDirections } from 'services/sorting';

export function SortingDropdown(props) {
    const sortingButtons = itemSortingFields.map(x => (
        <DropdownMenuItem
            key={x.itemKey}
            icon={x.icon}
            text={x.displayName}
            onClick={() => props.onChooseSort(x.itemKey, x.defaultSortingDirection)}
        />
    ));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button icon={faSort} text="Sort" />
            </DropdownMenuTrigger>
            <DropdownMenuContent loop={true}>
                {sortingButtons}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}