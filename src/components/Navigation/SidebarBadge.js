

export function SidebarBadge(props) {
    if (!props.count) {
        return null;
    }

    return (
        <span
            className={(props.active ? 'bg-green-700 text-white' : 'bg-gray-400 group-hover:bg-gray-500 text-white') + ' inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'}
        >
            {props.count}
        </span>
    )
}