import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../utils/axios";
import { FaTruck, FaHeadset, FaBoxOpen } from "react-icons/fa";

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
      <div className="p-10 text-center text-lg font-semibold">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-10 text-center text-lg text-red-500 font-semibold">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <FaBoxOpen /> Order #{order.id}
      </h1>

      <p className="text-gray-600 mb-6">
        Placed on {new Date(order.created_at).toLocaleString()}
      </p>

      {/* Order Status Section */}
      <div className="bg-white shadow rounded-lg p-5 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Status</h2>
        <div className="space-y-1">
          <p><strong>Order Status:</strong> {order.status}</p>
          <p><strong>Payment Status:</strong> {order.payment_status}</p>
          <p><strong>Delivery Status:</strong> {order.delivery_status}</p>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-lg p-5 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
        <p className="text-gray-700">
          {order.address.full_name}<br />
          {order.address.address_line}, {order.address.city}<br />
          {order.address.state} - {order.address.pincode}<br />
          Phone: {order.address.phone}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white shadow rounded-lg p-5 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Items in this Order</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-gray-600 text-sm">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="font-semibold text-indigo-600">
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white shadow rounded-lg p-5 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Payment Summary</h2>

        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{order.subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Discount:</span>
            <span>- ₹{order.discount}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total Paid:</span>
            <span>₹{order.total_amount}</span>
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link
          to={`/orders/${order.id}/track`}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <FaTruck /> Track Order
        </Link>

        <Link
          to={`/support/${order.id}`}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <FaHeadset /> Support
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
  );
}

export default OrderDetails;
