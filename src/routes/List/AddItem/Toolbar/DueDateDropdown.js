import { faCalendar, faCalendarCheck, faCalendarDay, faCalendarPlus, faCalendarWeek, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuHeading,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,

} from 'components/DropdownMenu';
import { format, nextMonday, startOfToday, startOfTomorrow } from 'date-fns';

function StaticDueDateButton(props) {
    const dayOfWeek = format(props.date, 'E');

    return (
        <DropdownMenuItem text={props.text} icon={props.icon} onClick={() => props.onClick(props.date)}>
            <span className="text-sm text-gray-400">{dayOfWeek}</span>
        </DropdownMenuItem>
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

                {/* <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>Sub menu →</DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item>Sub menu item</DropdownMenu.Item>
                            <DropdownMenu.Item>Sub menu item</DropdownMenu.Item>
                            <DropdownMenu.Arrow />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub> */}

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Custom Date Range
                    </DropdownMenuSubTrigger>
                </DropdownMenuSub>


                {props.showClearButton && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
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