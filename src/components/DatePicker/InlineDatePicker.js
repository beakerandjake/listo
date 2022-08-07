import ReactDatePicker from 'react-datepicker';
import { DatePickerHeader } from './DatePickerHeader';

export function InlineDatePicker(props) {
    return (
        <ReactDatePicker
            inline
            calendarClassName="listo-datepicker"
            selected={props.date}
            onChange={props.onChange}
            renderCustomHeader={DatePickerHeader}
            startDate
        />
    );
}