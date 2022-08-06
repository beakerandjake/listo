
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

export function DatePicker(props) {
    return (
        <ReactDatePicker
            inline
            calendarClassName="listo-datepicker"
            selected={props.date}
            onChange={props.onChange}
            renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
            }) => (
                <div className="flex items center justify-between px-3.5 py-2">

                    {/* <div className="flex items-center gap-3"> */}
                    <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        type="button"
                        className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="text-lg">
                        {format(date, 'MMMM yyyy')}
                    </div>
                    <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        type="button"
                        className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    {/* </div> */}
                </div>
            )}

        />
    );
}