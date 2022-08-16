import { Drawer } from 'components/Drawer';
import { Dropdown } from 'components/Dropdown';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';

const CLOSE_REASON = {
    outsideClick: 'click',
    escapeKey: 'esc'
}

export function ResponsiveMenu({
    open,
    onClose,
    children,
    isSubMenu = false,
    desktopPlacement = undefined,
    desktopOffset = undefined,
    mobileAnchor = 'bottom',
    mobileSize = 'xl',
    mobileShowCloseButton = true,
    mobileCloseButtonIcon = undefined,
    mobileCloseButtonTitle = undefined,
    mobileCloseButtonAnchor = undefined,
    trigger = null
}) {

    return (
        <div>
            {/* On larger screens, render a floating dropdown menu */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <Dropdown
                    open={open}
                    trigger={trigger}
                    onClickOutside={e => onClose(CLOSE_REASON.outsideClick, e)}
                    onEscapeKeyDown={() => onClose(CLOSE_REASON.escapeKey)}
                    placement={desktopPlacement}
                    offset={desktopOffset}
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
                >
                    {children}
                </Drawer>
            </MediaQuery>
        </div >
    )
}