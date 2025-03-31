import React, { useState } from 'react';
import { Star, Truck } from 'lucide-react';

export function OrderStatus({ status, onReview, onSubmitDeliveryDetails }) {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitDeliveryDetails(deliveryDetails);
  };

  if (status === 'delivery-details') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Receiver's Name
            </label>
            <input
              type="text"
              id="name"
              value={deliveryDetails.name}
              onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Delivery Address
            </label>
            <textarea
              id="address"
              value={deliveryDetails.address}
              onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              value={deliveryDetails.phone}
              onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    );
  }

  if (status === 'payment') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <div className="text-center">
          <Truck size={48} className="mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 mb-6">Your order is ready for payment</p>
          <button
            onClick={onSubmitDeliveryDetails}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  }

  if (status === 'paid') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
            <p className="font-medium">Payment Successful!</p>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding a rider for your order...</p>
        </div>
      </div>
    );
  }
      
  if (status === 'processing') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Assigning rider...</p>
        </div>
      </div>
    );
  }

  if (status === 'rider-assigned') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
        <div className="text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            <p className="font-medium">Rider Assigned!</p>
            <p className="mt-2">Your order is on the way</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'delivered') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
        <div className="text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
            <p className="font-medium">Order Delivered!</p>
          </div>
          <div>
            <p className="mb-4">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onReview?.(rating)}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}