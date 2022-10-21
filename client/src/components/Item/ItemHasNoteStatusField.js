import { faComment } from '@fortawesome/pro-regular-svg-icons';
import { ItemStatusField } from './ItemStatusField';

/**
 * Status field which displays whether or not the Item has a note.
 * @param {Object} props
 * @param {string} props.note - The note of the item.
 */
export const ItemHasNoteStatusField = ({ note }) => {
  if (!note) {
    return null;
  }

  return <ItemStatusField icon={faComment} text="Note" />;
};
