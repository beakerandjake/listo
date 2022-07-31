import { useState } from "react";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from 'components/IconButton';
import { ConfirmDeleteItem } from './List/ConfirmDeleteItem';
import { FormattedDate } from "components/FormattedDate";
import { CompletedCheckbox } from './List/Item/CompletedCheckbox';
import { NameLabel } from './List/Item/NameLabel';
import { QuantityButton } from "./List/Item/QuantityButton";
import { DebounceInput } from "react-debounce-input";


function EditItem(props) {

    return (
        <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl w-screen max-w-md">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3">
                <IconButton icon={faArrowLeft} className="text-gray-500 hover:text-gray-700" onClick={props.onClose} />
                <h2 className="text-lg font-medium">Item Details</h2>
            </div>
            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                {/* Name Label */}
                <div className="flex items-center">
                    <div className="-ml-2">
                        <CompletedCheckbox
                            checked={props.item.completed}
                            onChange={completed => props.onEditItem(props.item.id, { completed })}
                        />
                    </div>
                    <span className="text-md sm:text-lg font-medium text-gray-900">
                        <NameLabel completed={props.item.completed} name={props.item.name} />
                    </span>
                </div>
                {/* Item form */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-5">
                        <label className="text-sm font-medium text-gray-700">Quantity</label>
                        <div className="flex-grow-0">
                            <QuantityButton quantity={props.item.quantity} onQuantityChange={quantity => props.onEditItem(props.item.id, { quantity })} />
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-5">
                        <label className="text-sm font-medium text-gray-700">Due Date</label>
                        <div className="flex-grow-0">
                            <QuantityButton quantity={props.item.quantity} onQuantityChange={quantity => props.onEditItem(props.item.id, { quantity })} />
                        </div>
                    </div>

                    <div className="flex border-t border-gray-200 pt-5">
                        <DebounceInput
                            element="textarea"
                            value={props.item.note}
                            onChange={event => props.onEditItem(props.item.id, { note: event.target.value })}
                            debounceTimeout={800}
                            forceNotifyByEnter={false}
                            placeholder="Add Note"
                            className="border-gray-200 flex-1"
                            rows={3}
                        />
                    </div>

                </div>
            </div >
            {/* Footer */}
            < div className="flex flex-shrink-0 justify-between items-center px-4 py-4" >
                <IconButton icon={faArrowRightFromBracket} title="Close Details" onClick={props.onClose} />
                <FormattedDate date={props.item.created} className="text-sm font-semibold text-gray-500 select-none" prefix="Created" />
                <ConfirmDeleteItem onConfirmDelete={props.onDeleteItem} />
            </div >
        </div>
    )
}


export function Dashboard(props) {
    const [item, setItem] = useState({
        id: 6,
        name: 'Scrubbing Bubbles Bathroom Cleaner',
        quantity: 1,
        completed: false,
        created: new Date(2022, 6, 15).toISOString(),
        dueDate: new Date(2022, 8, 15).toISOString(),
    });

    const onEditItem = (id, changes) => {
        setItem({ ...item, ...changes })
    }

    return (
        <div className="flex-1 flex  gap-2">
            <div className="text-xs">
                <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
            <div className="mx-auto border border-gray-500">
                <EditItem item={item} onEditItem={onEditItem} />
            </div>
        </div>
    )
}



// import { PageHeader } from "components/PageHeader";

// export function Dashboard(props) {
//     return (
//         <div className="flex-1 flex flex-col gap-2">
//             <PageHeader name="Dashboard" />
//             <div className="border-4 border-dashed border-gray-200 rounded-lg flex-1" />
//         </div>
//     )
// }