import { useEffect, useState } from 'react'
import { format } from 'timeago.js'


export function FormattedDate(props) {
    const [formatted, setFormatted] = useState('');

    // any time our date changes, attempt to format it and store the result.
    useEffect(() => {
        const result = props.date ? format(props.date) : '';
        setFormatted(result);
    }, [props.date]);

    // no date? no display.
    if (!formatted) {
        return null;
    }

    return (
        <span className={props.className}>
            {props.prefix ? props.prefix + ' ' : null}{formatted}{props.postfix ? ' ' + props.postfix : null}
        </span>
    )
}