import { useEffect, useState } from "react";
import { format, nextMonday, startOfToday, startOfTomorrow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarWeek, faChevronRight, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "components/Calendar";
import {
    MenuHeader,
    MenuItem,
    MenuItemLabel,
    MenuSeparator,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent
} from "components/Menu";


function StaticDueDateMenuItem({ icon, date, text, onClick }) {
    return (
        <MenuItem icon={icon} label={text} onClick={onClick}>
            <MenuItemLabel className="text-gray-400 font-semibold">
                {format(date, 'E')}
            </MenuItemLabel>
        </MenuItem>
    )
};

export function SetDueDateMenu({ open, onClose, trigger, dueDate, onDueDateChange, }) {
    const [subMenuOpen, setSubMenuOpen] = useState(true);

    // Any time the menu is closed reset the sub menu state.
    useEffect(() => {
        if (!open) {
            console.log('close sub menu!')
            setSubMenuOpen(false);
        }
    }, [open])

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
    ].map(x => (<StaticDueDateMenuItem key={x.text} {...x} onClick={() => onDueDateChange(x.date)} />));

    const subMenuTrigger = (
        <MenuItem icon={faCalendarDays} label="Custom Due Date" onClick={() => setSubMenuOpen(true)}>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 group-hover:text-gray-700" />
        </MenuItem>
    );

    return (
        <ResponsiveMenu open={open} onClose={onClose} trigger={trigger}>
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Add Due Date</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent>
                {/* Static Date Buttons */}
                {staticDates}
                <MenuSeparator />
                {/* Custom Due Date Sub Menu */}
                <ResponsiveMenu
                    open={subMenuOpen}
                    onClose={() => setSubMenuOpen(false)}
                    trigger={subMenuTrigger}
                    desktopSide="right"
                    desktopAlign="start"
                    mobileCloseButtonAnchor="left"
                    mobileCloseButtonIcon={faArrowLeft}
                >
                    <MenuHeader className="flex items-center justify-center">
                        <MenuTitle className="">Custom Due Date</MenuTitle>
                    </MenuHeader>
                    <ScrollableMenuContent className="mb-2">
                        <Calendar value={dueDate} onChange={onDueDateChange} />
                    </ScrollableMenuContent>
                </ResponsiveMenu>
                {/* Remove Due Date Button */}
                {!!dueDate && (
                    <>
                        <MenuSeparator />
                        <MenuItem icon={faTrashAlt} label="Remove Due Date" variant="danger" onClick={() => onDueDateChange(null)} />
                    </>
                )}
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}