import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function FoodCard({ food, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{food.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${food.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(food)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors outline-none"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">From {food.restaurantName}</p>
      </div>
    </div>
  );
}