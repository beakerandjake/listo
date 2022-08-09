import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'services/responsiveUtilities';
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";



export function ResponsiveLayout(props) {
    const main = (
        <main className="flex flex-col flex-1 m-3 sm:m-6 md:m-8">
            {props.children}
        </main>
    )
    return (
        <div className="flex flex-col h-full overflow-auto">
            {/* Desktop / Larger screens */}
            <MediaQuery minWidth={MOBILE_BREAKPOINT}>
                <DesktopLayout sidebar={props.sidebar}>
                    {main}
                </DesktopLayout>
            </MediaQuery>

            {/* Mobile / Smaller screens */}
            <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
                <MobileLayout sidebar={props.sidebar}>
                    {main}
                </MobileLayout>
            </MediaQuery>
        </div>
    )
}