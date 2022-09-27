import { forwardRef } from 'react';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';
import { Drawer } from 'components/Drawer';
import { Dropdown } from 'components/Dropdown';

const CLOSE_REASON = {
  outsideClick: 'click',
  escapeKey: 'esc',
};

/**
 * A responsive menu which is displayed as a drawer on mobile and a dropdown on desktops.
 * @param {Object} props
 * @param {boolean} props.open - Is the menu currently opened or closed?
 * @param {function} props.onClose - Callback invoked when the menu is closed.
 * @param {ReactElement} props.trigger - The trigger element to render and position the floating content against.
 * @param {boolean} props.isSubMenu - Is this menu a sub menu of another menu?
 * @param {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'=} props.desktopPlacement - Where to place the floating element against the trigger.
 * @param {number} props.desktopOffset - Amount to displace the floating element from its default placement against the trigger.
 * @param {boolean} props.mobileAnchor - The title to display.
 * @param {'right'|'left'|'bottom'=} props.mobileAnchor - The side of the viewport that the Drawer is anchored to.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'=} props.mobileSize - How much of the viewport should the drawer take up?
 * @param {boolean=} props.mobileShowCloseButton - Should a default show button be rendered?
 * @param {IconDefinition=}  props.mobileCloseButtonIcon - The FontAwesomeIcon of the default close button.
 * @param {string}  props.mobileCloseButtonTitle - The text to display on close button hover.
 * @param {'left'|'right'=} props.mobileCloseButtonAnchor - The side of the drawer that the default close button will be anchored to.
 * @param {string} props.className - Classes to be applied to the root of the menu on desktop or mobile.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export const ResponsiveMenu = forwardRef(
  (
    {
      open,
      onClose,
      trigger = null,
      isSubMenu = false,
      desktopPlacement = undefined,
      desktopOffset = undefined,
      mobileAnchor = 'bottom',
      mobileSize = 'xl',
      mobileShowCloseButton = true,
      mobileCloseButtonIcon = undefined,
      mobileCloseButtonTitle = undefined,
      mobileCloseButtonAnchor = undefined,
      className,
      children,
    },
    ref
  ) => {
    return (
      <>
        {/* On larger screens, render a floating dropdown menu */}
        <MediaQuery minWidth={MOBILE_BREAKPOINT}>
          <Dropdown
            ref={ref}
            open={open}
            trigger={trigger}
            onClickOutside={(e) => onClose(CLOSE_REASON.outsideClick, e)}
            onEscapeKeyDown={() => onClose(CLOSE_REASON.escapeKey)}
            placement={desktopPlacement}
            offset={desktopOffset}
            overlay={!isSubMenu}
            className={className}
          >
            {children}
          </Dropdown>
        </MediaQuery>
        {/* On smaller screens, render a drawer menu */}
        <MediaQuery maxWidth={MOBILE_BREAKPOINT - 1}>
          {trigger}
          <Drawer
            open={open}
            onClose={onClose}
            isChildDrawer={isSubMenu}
            anchor={mobileAnchor}
            size={mobileSize}
            showCloseButton={mobileShowCloseButton}
            closeButtonIcon={mobileCloseButtonIcon}
            closeButtonTitle={mobileCloseButtonTitle}
            closeButtonAnchor={mobileCloseButtonAnchor}
            className={className}
          >
            {children}
          </Drawer>
        </MediaQuery>
      </>
    );
  }
);

/**
 * Why did the user close the menu?
 */
export const closeReasons = CLOSE_REASON;
