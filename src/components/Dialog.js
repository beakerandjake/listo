import { Fragment } from 'react';
import cx from 'classnames';
import {
  Dialog as HeadlessUiDialog,
  Transition
} from '@headlessui/react'


/**
 * Full screen backdrop which can sit over content but behind the Dialog.
 * @param {Object} props - The Props.
 * @param {string=} props.transitionEnter - Classes applied the entire time an element is entering.
 * @param {string=} props.transitionEnterFrom - Classes to start from.
 * @param {string=} props.enterTo - Classes to end at.
 * @param {string=} props.transitionLeave - Classes applied the entire time an element is leaving.
 * @param {string=} props.transitionLeaveFrom - Classes to leave from.
 * @param {string=} [props.transitionLeaveTo] - Classes to leave to.
 */
const DialogBackdrop = ({
  transitionEnter = 'ease-out duration-300',
  transitionEnterFrom = 'opacity-0',
  transitionEnterTo = 'opacity-100',
  transitionLeave = 'ease-in duration-200',
  transitionLeaveFrom = 'opacity-100',
  transitionLeaveTo = 'opacity-0'
}) => {
  return (
    <Transition.Child
      enter={transitionEnter}
      enterFrom={transitionEnterFrom}
      enterTo={transitionEnterTo}
      leave={transitionLeave}
      leaveFrom={transitionLeaveFrom}
      leaveTo={transitionLeaveTo}
    >
      <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' tabIndex={-1} />
    </Transition.Child>
  )
}

/**
 * Parent container for a modal Dialog.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the dialog currently be opened or closed?
 * @param {function} props.onClose - Callback fired when the user requests to close the dialog.
 * @param {string=} props.className - Additional styles to apply to the root of the Dialog.
 * @param {React.ReactNode} props.children - The content of the Dialog.
 */
export function Dialog({
  open = false,
  onClose,
  className,
  children
}) {
  return (
    <Transition show={open} as={Fragment}>
      <HeadlessUiDialog onClose={() => onClose()} className={cx('relative', className)}>
        {children}
      </HeadlessUiDialog>
    </Transition >
  )
}

/**
 * Container for the content of the dialog. Clicking outside of this element
 * will cause the onClose event of the parent Dialog to fire. 
 */
export const DialogContent = HeadlessUiDialog.Panel;