import { useParams } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../utils/axios";
import { FaHeadset } from "react-icons/fa";

function Support() {
  const { orderId } = useParams();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSupportSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter your issue.");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("support/create/", {
        order_id: orderId,
        message,
      });

      setSent(true);
      setMessage("");
    } catch (err) {
      console.error("Support error:", err);
      alert("Failed to send support request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <FaHeadset className="text-indigo-600 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-900">
            Support for Order #{orderId}
          </h1>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Tell us what issue you’re facing with this order and our support team
          will get back to you shortly.
        </p>

        {sent && (
          <div className="mb-5 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300 text-sm">
            ✅ Support request sent successfully!
          </div>
        )}

        <form onSubmit={handleSupportSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-xl resize-none
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-sm"
            placeholder="Describe your issue..."
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-2.5 rounded-xl font-semibold transition"
          >
            {loading ? "Sending..." : "Submit Support Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Support;
