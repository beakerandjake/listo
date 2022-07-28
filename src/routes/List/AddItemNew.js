import { faCalendar, faCalendarAlt, faHashtag, faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "components/IconButton";
import QuantityButton from "Old/QuantityButton";
import { useState } from "react"
import { QuantityBadge } from "./Item/QuantityBadge";

export function AddItemNew(props) {
    const [input, setInput] = useState('');

    return (
        <div className="shadow border-gray-300 border-2 shadow">
            <div>
                <input
                    type="text"
                    value={input}
                    onInput={e => setInput(e.target.value)}
                    className="w-full border-none focus:outline-none focus:ring-0 focus:border-b-2"
                    placeholder={props.placeholder || 'Add Item'}
                    autoComplete="off"
                    autoFocus
                    enterKeyHint="done"
                />
            </div>
            <div class="flex justify-between items-center py-2 px-4 bg-gray-200 border-gray-300 border-">
                <div class="flex items-center gap-4">
                    <IconButton icon={faPlusMinus} />
                    <IconButton icon={faCalendarAlt} />
                </div>
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add
                </button>
            </div>
        </div>
    )
}