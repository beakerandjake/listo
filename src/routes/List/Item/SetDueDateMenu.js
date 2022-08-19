import { useEffect, useRef, useState } from "react";
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
 * @param {boolean} props.open - Should the menu be opened or closed?
 * @param {function} props.onClose - Callback fired when the menu is closed.
 * @param {ReactElement} props.trigger -  The trigger element to render and position the floating content against.
 * @param {date} props.dueDate - The items due date.
 * @param {function} props.onDueDateChange - Callback fired when the due date changes.

 */
export function SetDueDateMenu({
    open,
    onClose,
    trigger,
    dueDate,
    onDueDateChange,
    desktopSubMenuPlacement = 'right-start',
    ...props
}) {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const subMenuRef = useRef(null);

    // Any time the menu is closed reset the sub menu state.
    useEffect(() => {
        if (!open) {
            setSubMenuOpen(false);
        }
    }, [open])

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

        onClose();
    }

    // Callback for the sub menu components onClose event.
    const onSubMenuClose = (reason) => {
        if (!open) {
            return;
        }

        setSubMenuOpen(false);

        // Handle edge case, always close the main menu if the user clicks outside the sub menu.
        if (subMenuOpen && reason === closeReasons.outsideClick) {
            onClose();
        }
    }

    return (
        <ResponsiveMenu
            {...props}
            open={open}
            onClose={onMainMenuClose}
            trigger={trigger}
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
                        onClick={() => onDueDateChange(date)}
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
                        <Calendar value={dueDate} onChange={onDueDateChange} />
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
                            onClick={() => onDueDateChange(null)}
                            onMouseEnter={() => setSubMenuOpen(false)}
                        />
                    </>
                )}
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}