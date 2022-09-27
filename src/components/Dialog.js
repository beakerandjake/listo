import { forwardRef } from 'react';
import { Dialog as HeadlessUiDialog } from '@headlessui/react';
import { Transition } from './Transition';

/**
 * Full screen backdrop which can sit over content but behind the Dialog.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the backdrop be displayed?
 * @param {object|string} props.classNames - Allows the default transition to be overwritten
 */
export const DialogBackdrop = ({ open = false, classNames = null }) => {
  return (
    <Transition
      in={open}
      appear
      classNames={
        classNames || {
          appear: 'opacity-0',
          appearActive: 'transition-opacity ease-in duration-300 !opacity-100',
          exit: 'opacity-100',
          exitActive: 'transition-opacity ease-in duration-300 !opacity-0',
        }
      }
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
        tabIndex={-1}
      />
    </Transition>
  );
};

/**
 * Parent container for a modal Dialog.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the dialog currently be opened or closed?
 * @param {function} props.onClose - Callback fired when the user requests to close the dialog.
 * @param {function} props.onExitTransitionComplete - Callback fired when the dialog has closed, and its exit transition has finished.
 * @param {string=} props.className - Additional styles to apply to the root of the Dialog.
 * @param {React.ReactNode} props.children - The content of the Dialog.
 */
export function Dialog({
  open = false,
  onClose,
  onExitTransitionComplete,
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
      className={className}
      onExited={() => onExitTransitionComplete && onExitTransitionComplete()}
    >
      <HeadlessUiDialog
        static
        open={open}
        onClose={() => onClose()}
        className="relative"
      >
        {children}
      </HeadlessUiDialog>
    </Transition>
  );
}

/**
 * Container for the content of the dialog. Clicking outside of this element
 * will cause the onClose event of the parent Dialog to fire.
 */
export const DialogContent = forwardRef(({ children, ...props }, ref) => {
  return (
    <HeadlessUiDialog.Panel ref={ref} {...props}>
      {children}
    </HeadlessUiDialog.Panel>
  );
});

/**
 * Accessible title for the Dialog.
 */
export const DialogTitle = HeadlessUiDialog.Title;

/**
 * Accessible description for the Dialog.
 */
export const DialogDescription = HeadlessUiDialog.Description;
