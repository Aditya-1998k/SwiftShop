import { useEffect, useState } from "react";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";
import { FaBox, FaTruck, FaHeadset } from "react-icons/fa";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await apiClient.get("order/my-orders/");
      console.log(res.data.orders)
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600">You have no orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 shadow rounded-lg border border-gray-200"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Order #{order.id}</h2>
              <span className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Total */}
            <div className="mt-3 font-semibold">
              Total Amount: ₹{order.total_amount}
            </div>

            {/* Order Status */}
            <div className="mt-2 text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-indigo-600">{order.status}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              
              {/* Track Order */}
              <Link
                to={`/orders/${order.id}/track`}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <FaTruck />
                Track Order
              </Link>

              {/* View Order */}
              <Link
                to={`/orders/${order.id}`}
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                <FaBox />
                View Details
              </Link>

              {/* Support */}
              <Link
                to={`/support/${order.id}`}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <FaHeadset />
                Support
              </Link>
              <Link
                onClick={async () => {
                  try {
                    await apiClient.post(`/order/${order.id}/send-invoice/`);
                    alert("Invoice sent to your email.");
                  } catch (err) {
                    console.error("Invoice send failed:", err);
                    alert("Failed to send invoice.");
                  }
                }}
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                📄 Send Invoice
            </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
