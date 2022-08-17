import { useEffect, useState } from "react";
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


export function SetDueDateMenu({ open, onClose, trigger, dueDate, onDueDateChange, }) {
    const [subMenuOpen, setSubMenuOpen] = useState(false);

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

    return (
        <ResponsiveMenu
            open={open}
            onClose={onClose}
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
                    open={subMenuOpen}
                    onClose={() => setSubMenuOpen(false)}
                    isSubMenu={true}
                    desktopPlacement="right-start"
                    mobileCloseButtonAnchor="left"
                    mobileCloseButtonIcon={faArrowLeft}
                    trigger={(
                        <MenuItem icon={faCalendarDays} label="Custom Due Date" onClick={() => setSubMenuOpen(true)}>
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