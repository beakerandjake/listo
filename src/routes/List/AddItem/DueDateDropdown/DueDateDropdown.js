import { AddItemToolbarButton } from '../Toolbar/AddItemToolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { faCalendarCheck, faCalendarPlus, faCalendarWeek, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CustomDateDropdown } from './CustomDateDropdown';


function tomorrow() {
    const toReturn = new Date();
    toReturn.setDate(new Date().getDate() + 1);
    return toReturn;
}

function CalculatedDueDate(props) {
    return (
        <DropdownMenuItem className="flex justify-between items-center bg-">
            {/* <FontAwesomeIcon icon={props.icon} className="text-gray-400 group-hover:text-gray-500" fixedWidth /> */}
            <p className="text-sm flex-1">{props.text}</p>
            <p className="text-sm text-gray-400">{props.day}</p>
        </DropdownMenuItem>
    )
}

export function DueDateDropdown(props) {

    const onChooseDate = date => {
        console.log('choose em', date);
    }

    const calculatedDueDates = (
        <>
            <CalculatedDueDate text="Today" icon={faCalendarCheck} day="Fri" date={new Date()} />
            <CalculatedDueDate text="Tomorrow" icon={faCalendarPlus} day="Sat" date={tomorrow()} />
            <CalculatedDueDate text="Next Week" icon={faCalendarWeek} day="Mon" date={tomorrow()} />
        </>
    );

    return (
        <DropdownMenu >
            <AddItemToolbarButton asChild>
                <DropdownMenuTrigger className="rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 leading-0" title="Add Due Date">
                    <FontAwesomeIcon icon={faCalendarCheck} className="text-gray-500 hover:text-gray-700" fixedWidth />
                </DropdownMenuTrigger>
            </AddItemToolbarButton>
            <DropdownMenuContent side="bottom" align="start" className="flex flex-col w-56 rounded-md shadow-xl bg-white ring-1 ring-gray-200 focus:outline-none">
                <DropdownMenuHeading title="Due Date" />
                {calculatedDueDates}
                <DropdownMenuSeparator />
                <CustomDateDropdown onChooseDate={onChooseDate} />
            </DropdownMenuContent>
        </DropdownMenu >
    )
}