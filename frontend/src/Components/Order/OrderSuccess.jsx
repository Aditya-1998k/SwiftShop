import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../utils/axios";

function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  const fetchData = async () => {
    try{
      const response = await apiClient.get("order/latest/");
      setOrder(response.data)
    } catch (err){
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading your order...</div>;
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Link to="/" className="text-blue-600 underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful</h1>
      <p className="text-gray-700 mb-6">Thank you for your purchase!</p>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Payment ID:</strong> {order.payment_id || "Cash On Delievery"}</p>
        <p><strong>Total Paid:</strong> ₹{order.total_amount}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong>Payment Status:</strong> {order.status}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          to={`/track-order/${order.order_id}`}
          className="w-full bg-blue-600 text-white py-2 text-center rounded hover:bg-blue-700"
        >
          Track Order
        </Link>

        <Link
          to="/support"
          className="w-full bg-gray-800 text-white py-2 text-center rounded hover:bg-gray-900"
        >
          Contact Support
        </Link>

        <Link
          to="/"
          className="w-full text-gray-700 underline text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
