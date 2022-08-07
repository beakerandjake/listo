import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuHeading,
    DropdownMenuItem,
} from 'components/DropdownMenu';
import { format, nextMonday, startOfToday, startOfTomorrow } from 'date-fns';

function StaticDueDateButton(props) {
    const dayOfWeek = format(props.date, 'E');

    return (
        <DropdownMenuItem onClick={() => props.onClick(props.date)}>
            <div className="flex flex-1 items-center justify-between">
                <span className="text-sm flex-1">{props.text}</span>
                <span className="text-sm text-gray-400">{dayOfWeek}</span>
            </div>
        </DropdownMenuItem>
    )
}

export function DueDateDropdown(props) {

    const staticDueDateButtons = (
        <>
            <StaticDueDateButton text="Today" day="Fri" date={startOfToday()} onClick={props.onDateChosen} />
            <StaticDueDateButton text="Tomorrow" day="Sat" date={startOfTomorrow()} onClick={props.onDateChosen} />
            <StaticDueDateButton text="Next Week" day="Mon" date={nextMonday(new Date())} onClick={props.onDateChosen} />
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}