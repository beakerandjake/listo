import { useMemo } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCalendar from 'react-calendar';

import './Calendar.css';

/**
 * A Calendar which allows the user to select a Date.
 * @param {Object} props
 * @param {Date} props.value - The currently selected Date.
 * @param {Function} props.onChange - The callback invoked when the user selects a Date.
 */
export function Calendar({ value, onChange }) {
  // ReactCalendar expects a Date, ensure we convert
  // string values to Dates.
  const parsedDate = useMemo(() => {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }, [value]);

  return (
    <ReactCalendar
      calendarType="ISO 8601"
      value={parsedDate}
      onChange={onChange}
      formatShortWeekday={(locale, date) => format(date, 'E')}
      prevLabel={<FontAwesomeIcon icon={faChevronLeft} />}
      prev2Label={null}
      nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
      next2Label={null}
      minDetail="year"
      showFixedNumberOfWeeks={true}
    />
  );
}
