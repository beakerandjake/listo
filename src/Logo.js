import React from 'react';

export default function Logo(props) {
    return (
        <h1 className="font-medium select-none text-2xl md:text-2xl flex-shrink-0 flex items-center">
            <span className="text-gray-600">listo</span>
            <span className="fa-stack text-[.35em]">
                <i className="fa-solid fa-square fa-stack-2x text-green-700"></i>
                <i className="fa-solid fa-check fa-stack-1x fa-inverse"></i>
            </span>
        </h1>
    );
}