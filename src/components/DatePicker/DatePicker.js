import { forwardRef } from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import { DatePickerHeader } from './DatePickerHeader';


export function DatePicker(props) {
    const Container = ({ className, children }) => {
        return (
            <div className="p-1 rounded-md shadow-lg bg-white ring-1 ring-gray-200 focus:outline-none">
                <CalendarContainer className={className}>
                    {children}
                </CalendarContainer>
            </div>
        );
    };

    // The only way I could figure out how to prevent the input from opening
    // the keyboard on mobile. Inspired by https://github.com/Hacker0x01/react-datepicker/issues/1640 
    const Input = forwardRef((props, ref) => <input {...props} type="text" ref={ref} />);

    return (
        <div>
            <ReactDatePicker
                popperPlacement='bottom'
                className={props.className}
                calendarClassName="listo-datepicker"
                placeholderText={props.placeholder}
                selected={props.date}
                onChange={props.onChange}
                renderCustomHeader={DatePickerHeader}
                showPopperArrow={false}
                calendarContainer={Container}
                customInput={<Input />}
            />
        </div>
    )
}
