import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../utils/axios";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiClient.get("order/latest/");
      setOrder(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Loading your order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Link to="/" className="text-indigo-600 underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* SUCCESS HEADER */}
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful
          </h1>
          <p className="text-gray-600 mt-1">
            Thank you for your purchase!
          </p>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-100 rounded-xl p-4 text-sm space-y-2 mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">
            Order Summary
          </h2>

          <p><strong>Order ID:</strong> {order.order_id}</p>
          <p>
            <strong>Payment ID:</strong>{" "}
            {order.payment_id || "Cash on Delivery"}
          </p>
          <p><strong>Total Paid:</strong> ₹{order.total_amount}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-medium">
              {order.status}
            </span>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <Link
            to={`/orders/${order.order_id}/track`}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-center font-semibold hover:bg-indigo-700 transition"
          >
            Track Order
          </Link>

          <Link
            to="/support"
            className="w-full bg-gray-800 text-white py-2.5 rounded-xl text-center hover:bg-gray-900 transition"
          >
            Contact Support
          </Link>

          <Link
            to="/"
            className="text-center text-gray-600 hover:text-gray-900 underline text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
