import React from 'react';
import { Trash2 } from 'lucide-react';

export function Cart({ items, onRemove, onQuantityChange, onCheckout, disable }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
              className="border rounded p-1"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={disable}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-800 disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}