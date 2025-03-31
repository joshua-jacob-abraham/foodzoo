import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export function RestaurantRegister() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    menuItems: [{ name: '', price: '', description: '', image: null }],
  });

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, { name: '', price: '', description: '', image: null }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Restaurant registration:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Register Your Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Restaurant Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Menu Items</h3>
          {formData.menuItems.map((item, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newMenuItems = [...formData.menuItems];
                    newMenuItems[index].name = e.target.value;
                    setFormData({ ...formData, menuItems: newMenuItems });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newMenuItems = [...formData.menuItems];
                    newMenuItems[index].price = e.target.value;
                    setFormData({ ...formData, menuItems: newMenuItems });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const newMenuItems = [...formData.menuItems];
                    newMenuItems[index].description = e.target.value;
                    setFormData({ ...formData, menuItems: newMenuItems });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const newMenuItems = [...formData.menuItems];
                      newMenuItems[index].image = e.target.files[0];
                      setFormData({ ...formData, menuItems: newMenuItems });
                    }}
                    className="hidden"
                    id={`image-${index}`}
                  />
                  <label
                    htmlFor={`image-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <Upload size={20} />
                    Upload Image
                  </label>
                  {item.image && <span className="text-sm text-gray-600">{item.image.name}</span>}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addMenuItem}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800"
          >
            + Add Another Item
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
}