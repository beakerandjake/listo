

export function SidebarBadge(props) {
    if (!props.count) {
        return null;
    }

    return (
        <span className={(props.active ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200') + ' ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'}
        >
            {props.count}
        </span>
    )
}