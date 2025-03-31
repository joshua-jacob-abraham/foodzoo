import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogIn, LogOut, UtensilsCrossed, Bike, Menu } from "lucide-react";

export function Navbar({ isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            Food Delivery
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 absolute top-2 right-5"
          >
            <Menu size={24} />
          </button>

          {isOpen && (
            <div className="absolute top-16 right-5 bg-white shadow-md rounded-lg p-4 space-y-4 w-60">
              <Link
                to="/restaurant-register"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <UtensilsCrossed size={20} />
                Register Restaurant
              </Link>
              <Link
                to="/rider-register"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Bike size={20} />
                Become a Rider
              </Link>
              {isLoggedIn ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LogIn size={20} />
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
