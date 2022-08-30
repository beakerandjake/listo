import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import ReactCalendar from 'react-calendar';

import './Calendar.css';

/**
 * A Calendar which allows the user to select a Date.
 * @param {Object} props
 * @param {Date} props.value - The currently selected Date. 
 * @param {Function} props.onChange - The callback invoked when the user selects a Date.
 */
export function Calendar({ value, onChange }) {
    return <ReactCalendar
        calendarType='US'
        value={value}
        onChange={onChange}
        formatShortWeekday={(locale, date) => format(date, 'E')}
        prevLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        prev2Label={null}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        next2Label={null}
        minDetail="year"
        showFixedNumberOfWeeks={true}
    />
}