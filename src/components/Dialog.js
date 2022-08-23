import cx from 'classnames';
import {
  Dialog as HeadlessUiDialog
} from '@headlessui/react'
import { Transition } from './Transition';


/**
 * Full screen backdrop which can sit over content but behind the Dialog.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the Dialog be displayed?
 * @param {string=} props.transitionEnter - Classes applied the entire time an element is entering.
 * @param {string=} props.transitionEnterFrom - Classes to start from.
 * @param {string=} props.enterTo - Classes to end at.
 * @param {string=} props.transitionLeave - Classes applied the entire time an element is leaving.
 * @param {string=} props.transitionLeaveFrom - Classes to leave from.
 * @param {string=} [props.transitionLeaveTo] - Classes to leave to.
 */
export const DialogBackdrop = ({ open = false }) => {
  return (
    <Transition
      in={open}
      appear
      classNames={{
        appear: 'opacity-0',
        appearActive: 'transition-opacity ease-out duration-300 !opacity-100',
        exit: 'opacity-100',
        exitActive: 'transition-opacity ease-in !opacity-0',
      }}
    >
      <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' tabIndex={-1} />
    </Transition>
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
  children,
  ...props
}) {
  return (
    <Transition
      {...props}
      in={open}
      appear
      unmountOnExit
    >
      <HeadlessUiDialog
        static
        open={open}
        onClose={() => onClose()}
        className={cx('relative', className)}
      >
        <DialogBackdrop open={open} />
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

/**
 * Accessible title for the Dialog.
 */
export const DialogTitle = HeadlessUiDialog.Title;

/**
 * Accessible description for the Dialog.
 */
export const DialogDescription = HeadlessUiDialog.Description;