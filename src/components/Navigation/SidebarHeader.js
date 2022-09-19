/**
 * Header section for sidebar which can group related items into a section.
 * @param {Object} props
 * @param {array} props.name - The text to display for the header.
 */
export function SidebarHeader({name}) {
    return (
        <div className="px-1 py-3 flex justify-between items-center text-sm font-semibold text-gray-500 select-none">
            <h3 className="uppercase tracking-wider">
                {name}
            </h3>
        </div>
    );
}