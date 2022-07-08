import React from 'react';

export default function Logo(props) {
    return (
        <span className="select-none flex flex-shrink-0 justify-between items-baseline gap-1">
            <span className="font-medium text-4xl md:text-4xl text-gray-600">listo</span>
            <i class="fa-solid fa-square-check text-3xl md:text-3xl text-green-700"></i>
        </span>
    );
}