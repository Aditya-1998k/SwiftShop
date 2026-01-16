import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../utils/axios";
import { FaTruck, FaHeadset, FaBoxOpen, FaFileInvoice } from "react-icons/fa";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const res = await apiClient.get(`order/details/${id}/`);
      setOrder(res.data.order);
    } catch (err) {
      console.error("Failed to load order details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-lg">
        Order not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <FaBoxOpen />
              Order #{order.id}
            </h1>

            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm">
              {order.status}
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            Placed on{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* STATUS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Status
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order</p>
                  <p className="font-semibold">{order.status}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment</p>
                  <p className="font-semibold">
                    {order.payment_status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Delivery</p>
                  <p className="font-semibold">
                    {order.delivery_status}
                  </p>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">
                Shipping Address
              </h2>

              <p className="text-gray-700 leading-relaxed">
                <strong>{order.address.full_name}</strong><br />
                {order.address.address_line}, {order.address.city}<br />
                {order.address.state} - {order.address.pincode}<br />
                Phone: {order.address.phone}
              </p>
            </div>

            {/* ITEMS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">
                Items in this Order
              </h2>

              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-indigo-600">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">

            {/* PAYMENT SUMMARY */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Summary
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">
                    -₹{order.discount}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Paid</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-3">
              <Link
                to={`/orders/${order.id}/track`}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                <FaTruck /> Track Order
              </Link>

              <Link
                to={`/support/${order.id}`}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition"
              >
                <FaHeadset /> Support
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
                className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-900 transition w-full"
              >
                <FaFileInvoice /> Send Invoice
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
