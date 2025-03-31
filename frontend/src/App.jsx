import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { FoodCard } from "./components/FoodCard";
import { Cart } from "./components/Cart";
import { OrderStatus } from "./components/OrderStatus";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { RestaurantRegister } from "./components/RestaurantRegister";
import { RiderRegister } from "./components/RiderRegister";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [foods, setFoods] = useState([]);
  const [user, setUser] = useState("");
  const [disableCheckout, setDisableCheckout] = useState(false);

  useEffect(() => {
    const savedRestaurant = localStorage.getItem("selectedRestaurant");
    const savedCart = localStorage.getItem("cartItems");

    if (savedRestaurant) setSelectedRestaurant(JSON.parse(savedRestaurant));
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching foods:", error));
  }, [selectedRestaurant]);

  console.log(selectedRestaurant);

  const availableFoods = selectedRestaurant
    ? foods.filter((food) => food.restaurantName === selectedRestaurant)
    : foods;

  const handleAddToCart = (food) => {
    setSelectedRestaurant(food.restaurantName);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (cartItems.length === 1) {
      setSelectedRestaurant(null);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      localStorage.setItem(
        "selectedRestaurant",
        JSON.stringify(selectedRestaurant)
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("user", JSON.stringify(user));

      setShowLoginPrompt(true);
      return;
    }
    setOrderStatus("delivery-details");
    setDisableCheckout(true);
  };

  const handleDeliveryDetails = (details) => {
    if (!details.name || !details.address || !details.phone) {
      alert("Please fill in all delivery details.");
      return;
    }

    setDeliveryDetails(details);
    setOrderStatus("payment");
  };

  const handlePayment = async () => {
    const payload = {
      username: user, 
      restaurantName: selectedRestaurant,
      amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      receiver: deliveryDetails.name,
      address: deliveryDetails.address,
      phone: deliveryDetails.phone,
    };

    console.log(payload);

    try {
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Checkout failed");
        return;
      }

      const data = await response.json();
      console.log("Order Created:", data);

      setOrderStatus("paid");

      setTimeout(() => {
        setOrderStatus("processing");
        setTimeout(() => {
          setOrderStatus("rider-assigned");
          setTimeout(() => {
            setOrderStatus("delivered");
          }, 5000);
        }, 3000);
      }, 5000);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleReview = (rating) => {
    alert(`Thank you for your ${rating}-star review!`);
    setCartItems([]);
    setSelectedRestaurant(null);
    setOrderStatus(null);
    setDeliveryDetails(null);
    setDisableCheckout(false);
  };

  const handleLogin = async (credentials, navigate) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}`);
        return;
      }

      setIsLoggedIn(true);
      setUser(credentials.username);
      setShowLoginPrompt(false);
      console.log(isLoggedIn);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRegister = async (credentials, navigate) => {
    console.log(credentials);
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.detail}`);
        return;
      }

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
    setSelectedRestaurant(null);
    setOrderStatus(null);
    setDeliveryDetails(null);
    setDisableCheckout(true);
    localStorage.removeItem("selectedRestaurant");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Login Required</h2>
                <p className="mb-4">Please log in to complete your order.</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginPrompt(false);
                      window.location.href = "/login";
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {orderStatus ? (
                      <OrderStatus
                        status={orderStatus}
                        onReview={handleReview}
                        onSubmitDeliveryDetails={
                          orderStatus === "delivery-details"
                            ? handleDeliveryDetails
                            : handlePayment
                        }
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableFoods.map((food) => (
                          <FoodCard
                            key={food.id}
                            food={food}
                            onAddToCart={handleAddToCart}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-1">
                    <Cart
                      items={cartItems}
                      onRemove={handleRemoveFromCart}
                      onQuantityChange={handleQuantityChange}
                      onCheckout={handleCheckout}
                      disable={disableCheckout}
                    />
                  </div>
                </div>
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={<RegisterForm onRegister={handleRegister} />}
            />
            <Route
              path="/restaurant-register"
              element={<RestaurantRegister />}
            />
            <Route path="/rider-register" element={<RiderRegister />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
