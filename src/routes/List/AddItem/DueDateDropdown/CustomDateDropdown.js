import ReactDatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';

// import './CustomDateDropdown.css';

export function CustomDateDropdown(props) {

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50">
                <p className="text-sm flex-1">Custom Date</p>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-white shadow">
                    <DropdownMenuHeading title="Set Custom Date" className="bg-gray-50 -my-1" />

                    <ReactDatePicker
                        inline
                        calendarClassName="react-datepicker-dropdown"
                        renderCustomHeader={({
                            date,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div className="flex items-center justify-between px-2 py-2">
                                <span className="text-lg text-gray-700">
                                    ASDF
                                </span>

                                <div className="space-x-2">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        type="button"
                                        className={`
                                                ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                                inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                            `}
                                    >
                                        {/* <ChevronLeftIcon className="w-5 h-5 text-gray-600" /> */}
                                        {"<"}
                                    </button>

                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        type="button"
                                        className={`
                                                ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                                inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                            `}
                                    >
                                        {/* <ChevronRightIcon className="w-5 h-5 text-gray-600" /> */}
                                        {">"}
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    )
}