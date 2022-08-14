import { Drawer } from 'components/Drawer';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuContentStyled,
    DropdownMenuPortal,
    DropdownMenuTrigger
} from './TempDropdown';

export function ResponsiveMenu({
    open,
    onClose,
    children,
    mobileAnchor = 'bottom',
    mobileSize = 'xl',
    mobileShowCloseButton = true,
    mobileCloseButtonIcon = null,
    mobileCloseButtonTitle = null,
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
                    <DropdownMenuContentStyled>
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
                    mobileCloseButtonIcon={mobileCloseButtonIcon}
                    closeButtonTitle={mobileCloseButtonTitle}
                >
                    {children}
                </Drawer>
            </MediaQuery>
        </div >
    )
}