import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { Drawer } from 'components/Drawer';
import { Transition } from 'components/Transition';

/**
 * Left Drawer container for the sidebar.
 * @param {Object} props
 * @param {boolean} props.open - Is the drawer opened or closed?
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export function CollapsibleSidebarContainer({ open, onClose, children }) {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="left"
        size="full"
        contentClassName="max-w-[80%]"
      >
        {children}
      </Drawer>

      {/* Floating Close Button */}
      <Transition
        in={open}
        unmountOnExit
        classNames={{
          enter: 'opacity-0 scale-0',
          enterActive:
            'transition-[transform,opacity] delay-150 !opacity-100 !scale-100',
          exit: 'opacity-100',
          exitActive: 'transition-opacity duration-75 !opacity-0',
        }}
      >
        <button
          className="fixed top-6 right-[calc(20%-3rem)] z-10"
          title="Close Navigation"
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faTimes} size="2xl" className="text-white" />
        </button>
      </Transition>
    </>
  );
}
