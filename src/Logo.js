import React from 'react';

export default function Logo(props) {
    return (
        <h1 className="font-medium leading-light text-5xl mt-5 select-none text-center">
            listo
            <span class="fa-stack text-[.35em] align-middle">
                <i class="fa-solid fa-square fa-stack-2x text-green-700"></i>
                <i class="fa-solid fa-check fa-stack-1x fa-inverse"></i>
            </span>
        </h1>
    );
}