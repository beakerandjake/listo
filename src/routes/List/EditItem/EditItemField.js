
export function EditItemField(props) {
    return (
        <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-5">
            {props.label &&
                <label className="text-sm font-medium text-gray-700">
                    {props.label}
                </label>
            }
            {props.children}
        </div>
    )
}