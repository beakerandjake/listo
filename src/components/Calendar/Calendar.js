import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import ReactCalendar from 'react-calendar';

// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

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
    />
}