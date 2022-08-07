import {
    differenceInCalendarDays,
    formatDistanceToNowStrict,
    isDate,
    isPast,
    isValid,
    parseISO
} from "date-fns";


export function formatDueDate(date) {
    const parsed = isDate(date) ? date : parseISO(date);

    if (!isValid(parsed)) {
        throw new Error('Invalid Date');
    }

    let toReturn;
    const dayDifference = differenceInCalendarDays(parsed, new Date());

    if (dayDifference === -1) {
        toReturn = 'Yesterday'
    } else if (dayDifference === 0) {
        return 'Today';
    } else if (dayDifference === 1) {
        return 'Tomorrow';
    } else {
        toReturn = formatDistanceToNowStrict(parsed, { addSuffix: true });
    }

    return (isPast(parsed) ? 'Overdue, ' : 'Due ') + toReturn;
}