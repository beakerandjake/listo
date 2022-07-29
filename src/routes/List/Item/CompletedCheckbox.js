
export function CompletedCheckbox(props) {

    const toggleValue = () => {
        props.onChange(!props.checked);
    }

    return (
        <div className="flex items-center p-2 cursor-pointer" onClick={toggleValue}>
            <input
                type="checkbox"
                className="focus:ring-green-500 text-green-700 border-gray-300 rounded cursor-pointer"
                checked={props.checked}
                onChange={toggleValue}
            />
        </div>
    )
}