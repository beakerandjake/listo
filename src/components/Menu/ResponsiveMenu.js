import { Drawer } from 'components/Drawer';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';
import {
    DropdownMenu,
    DropdownMenuContentStyled,
    DropdownMenuTrigger
} from './TempDropdown';

export function ResponsiveMenu({
    open,
    onClose,
    children,
    desktopSide = undefined,
    desktopAlign = undefined,
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
                <DropdownMenu open={open} onOpenChange={value => !value && onClose()}>
                    <DropdownMenuTrigger asChild>
                        {trigger}
                    </DropdownMenuTrigger>
                    <DropdownMenuContentStyled side={desktopSide} align={desktopAlign}>
                        {children}
                    </DropdownMenuContentStyled>
                </DropdownMenu>
            </MediaQuery>
            {/* On smaller screens, render a drawer menu */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
                {trigger}
                <Drawer
                    open={open}
                    onClose={onClose}
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