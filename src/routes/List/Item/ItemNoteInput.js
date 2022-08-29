import { DebounceInput } from "react-debounce-input";

/**
 * Text area for editing an items note field.
 * @param {Object} props - The props
 * @param {string} props.value - The value of the items note field.
 * @param {boolean} props.onChange - Callback invoked when the note value changes.
 */
export const ItemNoteInput = ({
    value,
    onChange
}) => {
    return (
        <DebounceInput
            element="textarea"
            value={value}
            onChange={event => onChange(event.target.value)}
            debounceTimeout={800}
            forceNotifyByEnter={false}
            placeholder="Add Note"
            className="rounded border border-gray-300 keyboard-only-focus-ring placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100"
            rows={3}
            title="Edit Item Note"
        />
    )
};