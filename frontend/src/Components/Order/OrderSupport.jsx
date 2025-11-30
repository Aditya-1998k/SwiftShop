import { useParams } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../utils/axios";

function Support() {
  const { orderId } = useParams();      // reading `/support/:orderId`
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
        message: message,
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">

      <h1 className="text-2xl font-bold mb-3">
        Support for Order #{orderId}
      </h1>

      <p className="text-gray-600 mb-6">
        Tell us what issue you’re facing with this order, and our support team will get back to you.
      </p>

      {sent && (
        <div className="p-3 mb-5 bg-green-100 text-green-700 border border-green-300 rounded-md">
          Support request sent successfully!
        </div>
      )}

      <form onSubmit={handleSupportSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your issue..."
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Sending..." : "Submit Support Request"}
        </button>
      </form>
    </div>
  );
}

export default Support;
