import { useState } from 'react';
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
                onFocus={(e) => e.target.readOnly = true}
                onBlur={e => e.target.readOnly = false}
            />
        </div>
    )
}
