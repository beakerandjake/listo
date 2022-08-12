import { Drawer } from 'components/Drawer';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuTrigger
} from './TempDropdown';

// open = false,
// onClose,
// anchor = ANCHORS.right,
// size = SIZES.md,
// showCloseButton = false,
// closeButtonAnchor = ANCHORS.right,
// closeButtonIcon = CLOSE_BUTTON_DEFAULT_ICON,
// closeButtonTitle = 'Close',
// children

export function ResponsiveMenu({
    open,
    onClose,
    children,
    mobileAnchor = 'bottom',
    mobileSize = 'xl',
    mobileShowCloseButton = true,
    mobileCloseButtonIcon = null,
    mobileCloseButtonTitle = null
}) {

    return (
        <div>
            {/* On larger screens, render a floating dropdown menu */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        ASDF
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent>
                            {children}
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </MediaQuery>
            {/* On smaller screens, render a drawer menu */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
                <Drawer
                    open={open}
                    onClose={onClose}
                    anchor={mobileAnchor}
                    size={mobileSize}
                    showCloseButton={mobileShowCloseButton}
                    mobileCloseButtonIcon={mobileCloseButtonIcon}
                    closeButtonTitle={mobileCloseButtonTitle}
                >
                    {children}
                </Drawer>
            </MediaQuery>
        </div >
    )
}