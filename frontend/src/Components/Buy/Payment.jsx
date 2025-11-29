import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import AddressSelector from "./Address";
import apiClient from "../../utils/axios";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

function Payment() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  const totalPrice = cart.reduce((sum, item) => sum + parseInt(item.price) * item.qty, 0);
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const finalAmount = totalPrice + deliveryCharge;

  // --------------------------
  // COD ORDER CREATION
  // --------------------------
  const handleCOD = async () => {
    if (!selectedAddress) return alert("Please select address");

    try {
      await apiClient.post("payment/cod-order/", {
        address_id: selectedAddress,
        total_amount: finalAmount,
        cart,
      });

      setTimeout(() => navigate("/order-success"), 300);
    } catch (error) {
      console.error(error);
      alert("Failed to place COD order");
    }
  };

  // --------------------------
  // Razorpay Payment
  // --------------------------
  const handleRazorpayPayment = async () => {
    if (!selectedAddress) return alert("Please select address");

    try {
      const res = await apiClient.post("payment/create-razorpay-order/", {
        amount: finalAmount * 100,
      });

      const { order_id, amount, currency, key } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "My Ecommerce Store",
        description: "Order Payment",
        order_id,

        handler: async (response) => {
          try {
            await apiClient.post("payment/verify/", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              address_id: selectedAddress,
              cart,
              total_amount: finalAmount,
            });

            // FIX: Delay navigation so popup fully closes
            setTimeout(() => navigate("/order-success"), 600);
          } catch (error) {
            console.log(error);
            alert("Payment verification failed!");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Popup closed by user");
          },
        },

        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#4F46E5",
        },
      };

      const razorPayObj = new window.Razorpay(options);
      razorPayObj.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  // --------------------------
  // FINAL PAY BUTTON
  // --------------------------
  const handlePay = () => {
    if (paymentMethod === "COD") handleCOD();
    else if (paymentMethod === "ONLINE") handleRazorpayPayment();
    else alert("Please select payment method");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2">
          <AddressSelector
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <h2 className="mt-6 font-semibold text-lg mb-2">Payment Method</h2>

          <div className="space-y-4">

            {/* ONLINE */}
            <div
              onClick={() => setPaymentMethod("ONLINE")}
              className={`p-4 rounded-lg shadow cursor-pointer bg-white flex items-center gap-3 border 
                ${paymentMethod === "ONLINE" ? "border-indigo-600" : "border-gray-300"}`}
            >
              <FaCreditCard className="text-indigo-600" size={25} />
              <h2 className="text-lg font-semibold">Online Payment (Razorpay)</h2>
            </div>

            {/* COD */}
            <div
              onClick={() => setPaymentMethod("COD")}
              className={`p-4 rounded-lg shadow cursor-pointer bg-white flex items-center gap-3 border 
                ${paymentMethod === "COD" ? "border-green-600" : "border-gray-300"}`}
            >
              <FaMoneyBillWave className="text-green-700" size={25} />
              <h2 className="text-lg font-semibold">Cash on Delivery</h2>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Price Details</h2>

          <p className="flex justify-between">
            <span>Items:</span>
            <span>₹{totalPrice}</span>
          </p>

          <p className="flex justify-between mt-2">
            <span>Delivery Charges:</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </p>

          <hr className="my-3" />

          <p className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{finalAmount}</span>
          </p>

          <button
            onClick={handlePay}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg text-lg hover:bg-indigo-700"
          >
            {paymentMethod === "COD" ? "Place COD Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
