import { faPencil, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { useRef, useState } from 'react';
import { EditItemMenuButton } from '../EditItem/EditItemMenuButton';
import { itemValidationConstants } from '.';
import { FadeAndPopIn } from 'components/Transition';
import { IconButton } from 'components/IconButton';

export const ItemNameInput = ({
    value,
    onChange
}) => {

    const inputIsBlank = value?.length <= 0;

    return (
        <div
            className={cx(
                'relative transition-colors'
            )}
        >
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
                onChange={e => onChange(e.target.value.trimStart())}
                placeholder="Item N&zwnj;ame"
                className={cx(
                    'min-h-[3.5rem] w-full',
                    'rounded border border-gray-300 placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100 pl-11 pr-10'
                )}
                autoComplete="off"
                maxLength={itemValidationConstants.maxNameLength}
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