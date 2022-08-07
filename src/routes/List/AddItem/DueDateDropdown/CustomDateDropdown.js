import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuHeading
} from 'components/DropdownMenu';
import { InlineDatePicker } from 'components/DatePicker';
import { Button } from 'components/Button';
import { useState } from 'react';

// import './CustomDateDropdown.css';

export function CustomDateDropdown(props) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const onClickSave = () => {
        if (!date) {
            return;
        }

        setOpen(false);
        props.onChooseDate(date);
    };

    return (
        <DropdownMenuSub open={open} onOpenChange={setOpen}>
            <DropdownMenuSubTrigger className="flex items-center w-full gap-1 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none radix-disabled:cursor-not-allowed radix-disabled:opacity-50">
                <p className="text-sm flex-1">Custom Date</p>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent collisionPadding={10} sideOffset={3}>
                <DropdownMenuHeading title="Set Custom Date" className="bg-gray-50 " />
                <InlineDatePicker date={date} onChange={setDate} />
                <div className="flex items-center justify-end px-4 pb-2">
                    <Button text="Save" disabled={!date} onClick={onClickSave} />
                </div>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}