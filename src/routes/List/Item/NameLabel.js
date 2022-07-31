import classNames from 'classnames';

export function NameLabel(props) {
    return (
        <p className={classNames({ 'line-through opacity-50': props.completed }, props.className)}>
            {props.name}
        </p>
    )
}