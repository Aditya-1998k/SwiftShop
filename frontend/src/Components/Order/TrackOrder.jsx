import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../utils/axios";

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
      <div className="p-10 text-center font-semibold text-lg">Loading tracking details...</div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-4 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-4">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        Order #{orderId}
      </h1>
      <p className="text-gray-500 mb-8">Tracking Updates</p>

      {/* Expected Delivery */}
      <div className="mb-10 p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
        <p className="text-gray-700 font-medium">
          Expected Delivery:{" "}
          <span className="font-semibold text-gray-900">{expectedDate}</span>
        </p>
      </div>

      {/* HORIZONTAL TIMELINE */}
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

        <div className="flex justify-between items-start relative z-10 px-2">

          {trackingSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center w-1/5">

              {/* Step Dot */}
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  step.completed
                    ? "border-green-600 bg-green-600"
                    : "border-gray-400 bg-white"
                }`}
              ></div>

              {/* Title */}
              <p
                className={`mt-3 text-sm font-medium ${
                  step.completed ? "text-green-700" : "text-gray-600"
                }`}
              >
                {step.title}
              </p>

              {/* Date */}
              {step.date ? (
                <p className="text-xs text-gray-500">{step.date}</p>
              ) : (
                <p className="text-xs text-gray-400">Pending</p>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
