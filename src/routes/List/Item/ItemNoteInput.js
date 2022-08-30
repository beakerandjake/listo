import cx from 'classnames';
import { itemValidationConstants } from '.';

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
        <textarea
            value={value}
            onChange={e => onChange(e.target.value.trimStart())}
            rows={3}
            name="note"
            className={cx(
                'resize-none rounded border border-gray-300',
                'placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100'
            )}
            placeholder="Add Note"
            maxLength={itemValidationConstants.maxNoteLength}
        />
    )
};