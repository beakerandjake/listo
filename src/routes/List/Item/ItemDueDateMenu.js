import { cloneElement, useRef, useState } from "react";
import { format, nextMonday, startOfToday, startOfTomorrow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCalendarCheck,
    faCalendarDay,
    faCalendarDays,
    faCalendarWeek,
    faChevronRight,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
    MenuHeader,
    MenuItem,
    MenuItemLabel,
    MenuSeparator,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent
} from "components/Menu";
import { Calendar } from "components/Calendar";
import { closeReasons } from "components/Menu/ResponsiveMenu";

/**
 * Responsive menu which allows the user to set or edit the item's due date.
 * @param {Object} props - The props (spread onto the responsive menu)
 * @param {ReactElement} props.trigger -  The trigger element to render and position the floating content against.
 * @param {date} props.dueDate - The items due date.
 * @param {function} props.onDueDateChange - Callback fired when the due date changes.
 */
export function ItemDueDateMenu({
    trigger,
    dueDate,
    onDueDateChange,
    desktopSubMenuPlacement = 'right-start',
    ...props
}) {
    const [open, setOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const subMenuRef = useRef(null);

    // Provide commonly used dates.
    const staticDates = [
        {
            text: 'Today',
            icon: faCalendarCheck,
            date: startOfToday()
        }, {
            text: 'Tomorrow',
            icon: faCalendarDay,
            date: startOfTomorrow()
        }, {
            text: 'Next Week',
            icon: faCalendarWeek,
            date: nextMonday(new Date())
        }
    ];

    // Close all menus and notify of due date change.
    const setDueDateAndCloseMenu = (dueDate) => {
        closeMenus();
        onDueDateChange(dueDate);
    }

    // Closes both the main and sub menus.
    const closeMenus = () => {
        setOpen(false);
        setSubMenuOpen(false);
    }

    // Callback for the top level menu components onClose event.
    const onMainMenuClose = (reason, event) => {
        if (subMenuOpen) {
            // Keep the menu open if the user is interacting with the sub menu.
            if (reason === closeReasons.outsideClick && subMenuRef.current.contains(event.target)) {
                return;
            }

            // Keep the menu open if the user pressed the escape key.
            if (reason === closeReasons.escapeKey) {
                return;
            }
        }

        closeMenus();
    }

    // Callback for the sub menu components onClose event.
    const onSubMenuClose = (reason) => {
        if (!open) {
            return;
        }

        setSubMenuOpen(false);

        // Handle edge case, always close the main menu if the user clicks outside the sub menu.
        if (subMenuOpen && reason === closeReasons.outsideClick) {
            closeMenus();
        }
    }

    return (
        <ResponsiveMenu
            {...props}
            open={open}
            onClose={onMainMenuClose}
            trigger={cloneElement(trigger, { onClick: () => setOpen(!open) })}
        >
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Add Due Date</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent>
                {/* Static Date Buttons */}
                {staticDates.map(({ text, icon, date }) => (
                    <MenuItem
                        key={text}
                        icon={icon}
                        label={text}
                        onClick={() => setDueDateAndCloseMenu(date)}
                        onMouseEnter={() => setSubMenuOpen(false)}
                    >
                        <MenuItemLabel className="text-gray-400 font-semibold">
                            {format(date, 'E')}
                        </MenuItemLabel>
                    </MenuItem>
                ))}
                <MenuSeparator />
                {/* Custom Due Date Sub Menu */}
                <ResponsiveMenu
                    ref={subMenuRef}
                    open={subMenuOpen}
                    onClose={onSubMenuClose}
                    isSubMenu={true}
                    desktopPlacement={desktopSubMenuPlacement}
                    mobileCloseButtonAnchor="left"
                    mobileCloseButtonIcon={faArrowLeft}
                    trigger={(
                        <MenuItem
                            icon={faCalendarDays}
                            label="Custom Due Date"
                            onClick={() => setSubMenuOpen(!subMenuOpen)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 group-hover:text-gray-700" />
                        </MenuItem>
                    )}
                >
                    <MenuHeader className="flex items-center justify-center">
                        <MenuTitle className="">Custom Due Date</MenuTitle>
                    </MenuHeader>
                    <ScrollableMenuContent className="mb-2">
                        <Calendar value={dueDate} onChange={setDueDateAndCloseMenu} />
                    </ScrollableMenuContent>
                </ResponsiveMenu>
                {/* Remove Due Date Button
                    Don't show when closing to prevent flash of appearing during close animation.
                    The flash can happen when a due date is selected after having been null.
                 */}
                {(!!dueDate && !!open) && (
                    <>
                        <MenuSeparator />
                        <MenuItem
                            icon={faTrashAlt}
                            label="Remove Due Date"
                            variant="danger"
                            onClick={() => setDueDateAndCloseMenu(null)}
                            onMouseEnter={() => setSubMenuOpen(false)}
                        />
                    </>
                )}
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}