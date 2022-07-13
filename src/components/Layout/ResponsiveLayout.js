import MediaQuery from 'react-responsive';
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

const MOBILE_BREAKPOINT = 768;

export function ResponsiveLayout(props) {
    return (
        <>
            {/* Desktop / Larger screens */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <DesktopLayout sidebar={props.sidebar}>
                    {props.children}
                </DesktopLayout>
            </MediaQuery>
            
            {/* Mobile / Smaller screens */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
                <MobileLayout sidebar={props.sidebar}>
                    {props.children}
                </MobileLayout>
            </MediaQuery>
        </>
    )
}