import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export function DueDatePicker(props) {
    const [date, setDate] = useState(null);

    // Ensure the date passed in is always turned into a date. 
    useEffect(() => {
        const parsedDate = Date.parse(props.date);

        if (!parsedDate || isNaN(parsedDate)) {
            setDate(null);
        } else {
            setDate(parsedDate);
        }

    }, [props.date]);

    return (

        <div className="flex w-full">
            <ReactDatePicker
                selected={date}
                onChange={props.onChange}
                placeholderText="Add Due Date"
                className="block w-full text-gray-900 border-gray-300 focus:outline-none focus:ring-0"
            />
            <button
                type="button"
                className="-ml-px px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!props.date}
                onClick={() => props.onChange(null)}
            >
                Clear
            </button>
        </div>
    );
};