import { faCalendar, faCalendarCheck, faCalendarDay, faCalendarPlus, faCalendarWeek, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuHeading,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuButton,
} from 'components/DropdownMenu';
import { format, nextMonday, startOfToday, startOfTomorrow } from 'date-fns';

function StaticDueDateButton(props) {
    const dayOfWeek = format(props.date, 'E');

    return (
        <DropdownMenuButton text={props.text} icon={props.icon} onClick={() => props.onClick(props.date)}>
            <span className="text-sm text-gray-400">{dayOfWeek}</span>
        </DropdownMenuButton>
    )
}

export function DueDateDropdown(props) {

    const staticDueDateButtons = (
        <>
            <StaticDueDateButton text="Today" day="Fri" icon={faCalendarCheck} date={startOfToday()} onClick={props.onDateChosen} />
            <StaticDueDateButton text="Tomorrow" day="Sat" icon={faCalendarDay} date={startOfTomorrow()} onClick={props.onDateChosen} />
            <StaticDueDateButton text="Next Week" day="Mon" icon={faCalendarWeek} date={nextMonday(new Date())} onClick={props.onDateChosen} />
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


                {props.showClearButton && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuButton
                            icon={faTrashAlt}
                            variant="danger"
                            text="Remove Due Date"
                            onClick={() => props.onDateChosen(null)}
                        />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}