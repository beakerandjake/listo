

export default function SidebarHeader(props) {
    return (
        <div className="px-1 pb-1 flex justify-between items-center text-sm font-semibold text-gray-500 select-none">
            <h3 className="uppercase tracking-wider">
                {props.name}
            </h3>
        </div>
    );
}