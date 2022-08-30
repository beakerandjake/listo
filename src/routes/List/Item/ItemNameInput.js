import { faPencil } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { useRef, useState } from 'react';
import { EditItemMenuButton } from '../EditItem/EditItemMenuButton';
import { itemValidationConstants } from '.';

export const ItemNameInput = ({
    value,
    onChange
}) => {
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
                        value?.length > 0 ? 'text-indigo-700' : 'text-gray-400',
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
                    'rounded border border-gray-300 placeholder-gray-400 [&:not(:focus)]:hover:bg-slate-100 pl-11'
                )}
                autoComplete="off"
                maxLength={itemValidationConstants.maxNameLength}
            />
        </div>
    );
};