import { cloneElement, forwardRef, useRef, useState } from "react";
import { format, nextMonday, startOfToday, startOfTomorrow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCalendarCheck,
    faCalendarDay,
    faCalendarDays,
    faCalendarPlus,
    faCalendarWeek,
    faChevronRight,
    faTrashCan
} from "@fortawesome/pro-regular-svg-icons";
import { formatDueDate, isOverdue } from "services/dueDateHelpers";
import { Calendar } from "components/Calendar";
import { closeReasons } from "components/Menu/ResponsiveMenu";
import { ItemFieldMenuButton } from "./ItemFieldMenuButton";
import {
    MenuHeader,
    MenuItem,
    MenuItemLabel,
    MenuSeparator,
    MenuTitle,
    ResponsiveMenu,
    ScrollableMenuContent
} from "components/Menu";

/**
 * If no trigger is provided, this is the default trigger to render.
 * @param {object} props - The props
 * @param {number} props.quantity - The quantity.
 * @param {function} props.onClear - Callback invoked when the user clicks the clear button. 
 */
const DefaultMenuTrigger = forwardRef(({
    dueDate,
    onClear,
    ...props
}, ref) => {
    return (
        <ItemFieldMenuButton
            {...props}
            ref={ref}
            icon={dueDate ? faCalendarCheck : faCalendarPlus}
            placeholder="Add Due Date"
            clearButtonTitle="Remove Due Date"
            onClearValue={onClear}
            variant={!dueDate
                ? 'default'
                : isOverdue(dueDate) ? 'danger' : 'success'
            }
            title="Change Due Date"
        >
            {!!dueDate && <span>{formatDueDate(dueDate)}</span>}
        </ItemFieldMenuButton>
    );
});

/**
 * Responsive menu which allows the user to set or edit the item's due date.
 * @param {Object} props - The props (spread onto the responsive menu)
 * @param {ReactElement} props.trigger -  The trigger element to render and position the floating content against.
 * @param {date} props.dueDate - The items due date.
 * @param {function} props.onChange - Callback fired when the due date changes.
 * @param {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'=} props.desktopSubMenuPlacement - Where to place the floating element against the trigger.
 */
export function ItemDueDateMenu({
    trigger,
    dueDate,
    onChange,
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
        onChange(dueDate);
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

    // if custom trigger is not provided, use default trigger.
    const chosenTrigger = trigger || (
        <DefaultMenuTrigger dueDate={dueDate} onClear={() => onChange(null)} />
    );

    return (
        <ResponsiveMenu
            {...props}
            open={open}
            onClose={onMainMenuClose}
            trigger={cloneElement(chosenTrigger, { onClick: () => setOpen(!open) })}
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
                    Visibility is controlled via CSS to prevent issue when toolbar detects an "outside click"
                 */}
                <span className={!!dueDate && !!open ? 'visible' : 'hidden'}>
                    <MenuSeparator />
                    <MenuItem
                        icon={faTrashCan}
                        label="Remove Due Date"
                        variant="danger"
                        onClick={() => setDueDateAndCloseMenu(null)}
                        onMouseEnter={() => setSubMenuOpen(false)}
                    />
                </span>
            </ScrollableMenuContent>
        </ResponsiveMenu>
    )
}