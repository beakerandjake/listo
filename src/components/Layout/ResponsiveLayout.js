import MediaQuery from 'react-responsive';
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

const MOBILE_BREAKPOINT = 768;

export function ResponsiveLayout(props) {
    const main = (
        <main>
            <div className="py-4">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
                    {props.children}
                </div>
            </div>
        </main>
    )
    return (
        <>
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
        </>
    )
}