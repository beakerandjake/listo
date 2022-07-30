import classNames from 'classnames';

export function Button(props) {
    let style = "text-gray-700 bg-white enabled:hover:bg-gray-50";

    if (props.type === 'danger') {
        style = "text-white bg-red-600 enabled:hover:bg-red-700";
    }

    return (
        <button
            className={classNames(style, 'disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-0')}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}