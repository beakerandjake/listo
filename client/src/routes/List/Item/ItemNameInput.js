import { faPencil, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import { itemValidationConstants } from '.';
import { FadeAndPopIn } from 'components/Transition';
import { IconButton } from 'components/IconButton';

export const ItemNameInput = ({ value, onChange, onSubmit }) => {
  // support quick add by notifying of submit.
  const onKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    onSubmit();
  };

  const inputIsBlank = value?.length <= 0;

  return (
    <div className={cx('relative transition-colors')}>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center ">
        <FontAwesomeIcon
          icon={faPencil}
          fixedWidth
          className={cx(
            inputIsBlank ? 'text-gray-400' : 'text-indigo-700',
            'transition-colors'
          )}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.trimStart())}
        onKeyDown={onKeyDown}
        placeholder="Item N&zwnj;ame"
        autoComplete="off"
        maxLength={itemValidationConstants.maxNameLength}
        enterKeyHint="done"
        className={cx(
          'min-h-[3.5rem] w-full',
          'rounded border border-gray-300 placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100 pl-11 pr-10'
        )}
      />
      {/* Clear input Button */}
      <FadeAndPopIn in={!inputIsBlank} unmountOnExit>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <IconButton
            icon={faTimes}
            onClick={() => onChange('')}
            title="Clear Item Name"
          />
        </div>
      </FadeAndPopIn>
    </div>
  );
};
