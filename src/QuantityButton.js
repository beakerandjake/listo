import React from 'react';

export default function QuantityButton(props) {
  const quantity = parseInt(props.quantity);

  return (
    <fieldset
      disabled={props.disabled}
      className={"flex divide-x divide-gray-300 border border-gray-300 rounded h-8 disabled:cursor-not-allowed " + (props.disabled ? 'opacity-50' : '')}
    >
      <button
        className="text-gray-600 hover:text-white bg-gray-100 hover:bg-red-600 w-8 rounded-l cursor-pointer disabled:pointer-events-none"
        onClick={() => props.onQuantityChange(quantity - 1)}>
        -
      </button>
      <span className="w-10 text-gray-600 font-semibold flex items-center justify-center">
        {quantity}
      </span>
      <button
        className="text-gray-600 hover:text-white bg-gray-100 hover:bg-green-700 w-8 rounded-r cursor-pointer disabled:pointer-events-none"
        onClick={() => props.onQuantityChange(quantity + 1)}>
        +
      </button>
    </fieldset>
  );
}