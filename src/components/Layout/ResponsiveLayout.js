import MediaQuery from 'react-responsive';
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

const MOBILE_BREAKPOINT = 768;

export function ResponsiveLayout(props) {
    const main = (
        <main className="flex flex-col flex-1 m-4 sm:m-6 md:m-8">
            {props.children}
        </main>
    )
    return (
        <div className="flex flex-col h-full">
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