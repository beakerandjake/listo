import React from 'react';

export default function Error(props) {
    return (
        <div>
            <h3>Error!</h3>
            <span>{props.details}</span>
        </div>
    );
}