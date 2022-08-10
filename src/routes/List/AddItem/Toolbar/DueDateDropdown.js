import { faCalendar, faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faCalendarWeek, faChevronRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { InlineDatePicker } from 'components/DatePicker';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuHeading,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuItemContent,

} from 'components/DropdownMenu';
import { format, nextMonday, startOfToday, startOfTomorrow } from 'date-fns';
import { useState } from 'react';

function StaticDueDateButton(props) {
    const dayOfWeek = format(props.date, 'E');

    return (
        <DropdownMenuItem label={props.text} icon={props.icon} onClick={() => props.onClick(props.date)}>
            <span className="text-sm text-gray-400">{dayOfWeek}</span>
        </DropdownMenuItem>
    )
}

function CustomDueDatePicker(props) {
    const [chosenDate, setChosenDate] = useState(props.startDate || startOfToday());

    return (
        <div>
            <InlineDatePicker date={chosenDate} onChange={setChosenDate} />
            <div className="flex items-center justify-end px-4 pb-2">
                <Button text="Save" disabled={!chosenDate} onClick={() => props.onDateChange(chosenDate)} />
            </div>
        </div>
    )
}

export function DueDateDropdown(props) {

    const staticDueDateButtons = (
        <>
            <StaticDueDateButton text="Today" day="Fri" icon={faCalendarCheck} date={startOfToday()} onClick={props.onDateChange} />
            <StaticDueDateButton text="Tomorrow" day="Sat" icon={faCalendarDay} date={startOfTomorrow()} onClick={props.onDateChange} />
            <StaticDueDateButton text="Next Week" day="Mon" icon={faCalendarWeek} date={nextMonday(new Date())} onClick={props.onDateChange} />
        </>
    );

    return (
        <DropdownMenu open={props.open} onOpenChange={props.onOpenChange}>
            <DropdownMenuTrigger asChild>
                {props.trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' loop={true} >
                <DropdownMenuHeading title="Add Due Date" />
                {staticDueDateButtons}

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="focus:outline-none group">
                        <DropdownMenuSeparator />
                        <DropdownMenuItemContent text="Custom Date" icon={faCalendarDays}>
                            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 group-hover:text-gray-500 group-focus-visible:text-gray-500" />
                        </DropdownMenuItemContent>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent collisionPadding={10} sideOffset={5} alignOffset={8}>
                        <DropdownMenuHeading title="Set Custom Date" />
                        <CustomDueDatePicker startDate={props.dueDate} onDateChange={props.onDateChange} />
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

                {props.showClearButton && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            icon={faTrashAlt}
                            variant="danger"
                            label="Remove Due Date"
                            onClick={() => props.onDateChange(null)}
                        />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}