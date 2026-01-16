import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../utils/axios";
import { FaTruck } from "react-icons/fa";

function TrackOrder() {
  const { orderId } = useParams();

  const [trackingSteps, setTrackingSteps] = useState([]);
  const [expectedDate, setExpectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrackingData = async () => {
    try {
      const res = await apiClient.get(`/order/${orderId}/track/`);
      setTrackingSteps(res.data.tracking_steps);
      setExpectedDate(res.data.expected_delivery);
      setError("");
    } catch (err) {
      console.error("Failed to fetch tracking info:", err);
      setError("Could not load tracking details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Loading tracking details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 text-center bg-white rounded-2xl shadow-md text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTruck className="text-indigo-600" />
            Track Order #{orderId}
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time updates for your shipment
          </p>
        </div>

        {/* ================= EXPECTED DELIVERY ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12 text-center">
          <p className="text-gray-600">
            Expected Delivery
          </p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {expectedDate}
          </p>
        </div>

        {/* ================= TIMELINE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full" />

            <div className="flex justify-between relative z-10">
              {trackingSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center flex-1"
                >
                  {/* DOT */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      step.completed
                        ? "bg-green-600 border-green-600"
                        : "bg-white border-gray-400"
                    }`}
                  />

                  {/* TITLE */}
                  <p
                    className={`mt-4 text-sm font-semibold ${
                      step.completed
                        ? "text-green-700"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* DATE */}
                  <p className="text-xs mt-1 text-gray-500">
                    {step.date || "Pending"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TrackOrder;
