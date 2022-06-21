import React from 'react';

export default function QuantityButton(props) {
  const quantity = parseInt(props.quantity);

  return (
      <span className="flex divide-x divide-gray-300 border border-gray-300 rounded h-8">
        <button
          className="text-gray-600 hover:text-white hover:bg-red-600 w-8 rounded-l cursor-pointer"
          onClick={() => props.onQuantityChange(quantity - 1)} disabled={props.disabled}>
          -
        </button>
        <span className="w-10 text-gray-600 font-semibold flex items-center justify-center">
          {quantity}
        </span>
        <button
          className="text-gray-600 hover:text-white hover:bg-green-700 w-8 rounded-r cursor-pointer"
          onClick={() => props.onQuantityChange(quantity + 1)} disabled={props.disabled}>
          +
        </button>
      </span>
  );
}