import React from 'react';
import { TrashIcon } from '@heroicons/react/outline'

export default function DeleteButton(props) {
    return (
        <div title="Delete item">
            <TrashIcon
                className="h-5 w-5 bg-none border-none underline cursor-pointer text-gray-600 hover:text-red-600"
                onClick={props.onClick}
                disabled={props.disabled}
            />
        </div>
    );
}