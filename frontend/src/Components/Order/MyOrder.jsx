import { useEffect, useState } from "react";
import apiClient from "../../utils/axios";
import { Link } from "react-router-dom";
import { FaBox, FaTruck, FaHeadset, FaFileInvoice } from "react-icons/fa";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await apiClient.get("order/my-orders/");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          My Orders
        </h1>

        {/* ================= EMPTY STATE ================= */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center">
            <FaBox size={56} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >

                {/* ================= ORDER HEADER ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-600">
                    {order.status}
                  </span>
                </div>

                {/* ================= AMOUNT ================= */}
                <div className="mt-4 text-gray-800 font-semibold">
                  Total Amount:{" "}
                  <span className="text-indigo-600">
                    ₹{order.total_amount}
                  </span>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="mt-6 flex flex-wrap gap-3">

                  <Link
                    to={`/orders/${order.id}/track`}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                  >
                    <FaTruck />
                    Track Order
                  </Link>

                  <Link
                    to={`/orders/${order.id}`}
                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
                  >
                    <FaBox />
                    View Details
                  </Link>

                  <Link
                    to={`/support/${order.id}`}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition"
                  >
                    <FaHeadset />
                    Support
                  </Link>

                  <button
                    onClick={async () => {
                      try {
                        await apiClient.post(
                          `/order/${order.id}/send-invoice/`
                        );
                        alert("Invoice sent to your email.");
                      } catch (err) {
                        console.error("Invoice send failed:", err);
                        alert("Failed to send invoice.");
                      }
                    }}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
                  >
                    <FaFileInvoice />
                    Send Invoice
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
