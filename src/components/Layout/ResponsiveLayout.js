import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export function ResponsiveLayout(props) {
    const isMobile = false;

    if (isMobile) {
        return (
            <MobileLayout items={props.items}>
                {props.children}
            </MobileLayout>
        )
    }

    return (
        <DesktopLayout items={props.items}>
            {props.children}
        </DesktopLayout>
    )
}