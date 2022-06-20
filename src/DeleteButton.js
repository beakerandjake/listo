import React from 'react';

export default function DeleteButton(props) {
    return <button className="bg-none border-none p-0 underline cursor-pointer" onClick={props.onClick} disabled={props.disabled}>Delete</button>
}