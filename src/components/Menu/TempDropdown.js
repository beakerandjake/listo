import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRef } from 'react';

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
export const DropdownMenuPortal = RadixDropdownMenu.Portal;
export const DropdownMenuContent = RadixDropdownMenu.Content;


export function DropdownMenuContentStyled({
    side = 'bottom',
    align = 'end',
    sideOffset = 5,
    collisionPadding = 10,
    children,
    ...props
}) {
    const z = useRef(null);
    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                side={side}
                align={align}
                sideOffset={sideOffset}
                collisionPadding={collisionPadding}
                className="flex flex-col min-w-[14rem] rounded-md shadow-lg bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none z-[3] overflow-hidden"
                {...props}
                onOpenAutoFocus={e => {
                    e.preventDefault();
                    z.current.focus();
                }}
                ref={z}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    );
}