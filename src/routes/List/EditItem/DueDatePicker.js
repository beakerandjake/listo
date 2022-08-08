import { DatePicker } from "components/DatePicker";
import { isDate, parseISO, formatISO } from "date-fns";

export function DueDatePicker(props) {
    let parsed = isDate(props.date) ? props.date : parseISO(props.date);

    if (isNaN(parsed)) {
        parsed = null;
    }

    return (
        <div className="flex w-full">
            <div className="w-full">
                <DatePicker
                    placeholder="Add Due Date"
                    className="w-full text-gray-900 border-gray-300 focus:outline-none focus:ring-0"
                    date={parsed}
                    onChange={date => props.onChange(formatISO(date))}
                />
            </div>
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