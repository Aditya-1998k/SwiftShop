import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseInt(item.price) * item.qty,
    0
  );

  const handleBuy = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (isLoggedIn) {
      navigate("/payment");
    } else {
      navigate("/login", {
        state: { from: location.pathname },
      });
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
          Your Cart
        </h1>

        {/* ================= EMPTY CART ================= */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 flex flex-col items-center text-center">
            <FaShoppingCart size={64} className="text-gray-300 mb-6" />

            <h2 className="text-2xl font-semibold mb-2">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-6 max-w-md">
              Looks like you haven’t added anything yet.
              Explore products and grab the best deals!
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ================= CART ITEMS ================= */}
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.img || item.image}
                      alt={item.name}
                      className="h-24 w-24 object-contain bg-gray-100 rounded-xl"
                    />

                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-indigo-600 font-bold mt-1">
                        ₹{item.price}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.qty}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* ================= PRICE SUMMARY ================= */}
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Price Details
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">
                    Free
                  </span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleBuy}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Secure checkout · 100% safe payments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
