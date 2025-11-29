import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    return sum + parseInt(item.price) * item.qty;
  }, 0);

  // Handle Buy Now / Checkout
  const handleBuy = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {/* Left Section — Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={item.index}
                className="border bg-white p-4 rounded-lg flex items-center justify-between shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.img || item.image} className="h-20 w-20 object-contain rounded" alt={item.name}/>

                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-green-600 font-bold">{item.price}</p>
                    <p className="text-sm">Qty: {item.qty}</p>
                  </div>
                </div>

                <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Section — Total + Buy */}
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>

            <p className="flex justify-between">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </p>

            <p className="flex justify-between font-semibold text-lg mt-2">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </p>

            <button
              onClick={handleBuy}
              className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg text-lg hover:bg-indigo-700"
            > Proceed to Buy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
