import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaGoogle,
  FaHome,
} from "react-icons/fa";

function Payment() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // When user hits payment, ensure he's logged in
  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  // Calculate total
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return sum + price * item.qty;
  }, 0);

  const deliveryCharge = totalPrice > 500 ? 0 : 40;

  const finalAmount = totalPrice + deliveryCharge;

  const handlePayment = () => {
    alert("Proceeding to payment gateway...");
    // later -> integrate Razorpay
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Select Payment Method</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT - Payment Methods */}
        <div className="md:col-span-2 space-y-4">

          {/* Credit / Debit Card */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-indigo-600" size={25} />
              <h2 className="text-lg font-semibold">Credit / Debit Card</h2>
            </div>
            <p className="text-gray-600 mt-1 text-sm">
              Visa, Mastercard, Rupay, Amex
            </p>
          </div>

          {/* UPI */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-3">
              <FaGoogle className="text-green-600" size={25} />
              <h2 className="text-lg font-semibold">UPI (Google Pay / PhonePe / Paytm)</h2>
            </div>
            <p className="text-gray-600 mt-1 text-sm">Instant & secure</p>
          </div>

          {/* Wallets */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-3">
              <FaWallet className="text-yellow-500" size={25} />
              <h2 className="text-lg font-semibold">Wallets</h2>
            </div>
            <p className="text-gray-600 mt-1 text-sm">Amazon Pay, PhonePe, Paytm</p>
          </div>

          {/* Cash on Delivery */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-green-700" size={25} />
              <h2 className="text-lg font-semibold">Cash on Delivery</h2>
            </div>
            <p className="text-gray-600 mt-1 text-sm">Pay when you receive the order</p>
          </div>

        </div>

        {/* RIGHT - Price Summary */}
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Price Details</h2>

          <p className="flex justify-between">
            <span>Price ({cart.length} items):</span>
            <span>₹{totalPrice}</span>
          </p>

          <p className="flex justify-between mt-2">
            <span>Delivery Charges:</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </p>

          <hr className="my-3" />

          <p className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{finalAmount}</span>
          </p>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg text-lg hover:bg-indigo-700"
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default Payment;
