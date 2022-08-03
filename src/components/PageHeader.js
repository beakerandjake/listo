export function PageHeader(props) {
    return (
        <h1 className="text-2xl font-bold md:font-medium leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {props.name}
        </h1>
    )
}