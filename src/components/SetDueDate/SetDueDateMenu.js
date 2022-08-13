import { faArrowLeft, faArrowRightFromBracket, faArrowsLeftRightToLine, faBackwardStep, faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarWeek, faChevronLeft, faChevronRight, faLeftLong, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "components/Calendar";
import { Drawer } from "components/Drawer";
import { IconButton } from "components/IconButton";
import { MenuHeader, MenuItem, MenuItemLabel, MenuSeparator, MenuTitle, ScrollableMenuContent } from "components/Menu";
import { format, nextMonday, startOfToday, startOfTomorrow } from "date-fns";
import { useState } from "react";


function StaticDueDateMenuItem({ icon, date, text, onClick }) {

    return (
        <MenuItem icon={icon} label={text} onClick={onClick}>
            <MenuItemLabel className="text-gray-400 font-semibold">
                {format(date, 'E')}
            </MenuItemLabel>
        </MenuItem>
    )
};

export function SetDueDateMenu({ dueDate, onDueDateChange, onOpenCustomDueDate }) {
    const [subMenuOpen, setSubMenuOpen] = useState(false);

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
    ].map(x => {
        return <StaticDueDateMenuItem key={x.text} {...x} onClick={() => onDueDateChange(x.date)} />
    });

    return (
        <>
            <MenuHeader className="flex items-center justify-center">
                <MenuTitle>Add Due Date</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent>
                {staticDates}
                <MenuSeparator />
                <MenuItem icon={faCalendarDays} label="Custom Due Date" onClick={() => setSubMenuOpen(true)}>
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 group-hover:text-gray-700" />
                </MenuItem>
                {!!dueDate && (
                    <>
                        <MenuSeparator />
                        <MenuItem icon={faTrashAlt} label="Remove Due Date" variant="danger" onClick={() => onDueDateChange(null)} />
                    </>
                )}

            </ScrollableMenuContent>
            {/* Set Custom Date Sub Menu! */}
            <Drawer
                open={subMenuOpen}
                onClose={() => setSubMenuOpen(false)}
                anchor="bottom"
                size="xl"
                showCloseButton={true}
                closeButtonAnchor="left"
                closeButtonIcon={faArrowLeft}
            >
                <MenuHeader className="flex items-center justify-center">
                    <MenuTitle className="">Custom Due Date</MenuTitle>
                </MenuHeader>
                <ScrollableMenuContent className="mb-2">
                    <Calendar value={dueDate} onChange={onDueDateChange} />
                </ScrollableMenuContent>
            </Drawer>
        </>
    )
}