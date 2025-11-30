import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TrackOrder() {
  const { orderId } = useParams();

  const [trackingSteps, setTrackingSteps] = useState([]);
  const [expectedDate, setExpectedDate] = useState("");

  useEffect(() => {
    // Dummy Order Date
    const orderDate = new Date("2024-01-20"); // replace later with API date

    // Expected delivery = +7 days
    const expected = new Date(orderDate);
    expected.setDate(orderDate.getDate() + 7);
    setExpectedDate(expected.toDateString());

    // Dummy tracking steps
    const dummySteps = [
      { title: "Order Placed", completed: true, date: "20 Jan 2024" },
      { title: "Order Received", completed: true, date: "20 Jan 2024" },
      { title: "Shipped", completed: true, date: "21 Jan 2024" },
      { title: "Reached Hub", completed: true, date: "22 Jan 2024" },
      { title: "Out for Delivery", completed: false, date: null },
      { title: "Delivered", completed: false, date: null },
    ];

    setTrackingSteps(dummySteps);
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-4">
      <h1 className="text-2xl font-bold mb-6">Order #{orderId} - Tracking</h1>

      {/* Expected Delivery */}
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-indigo-700 font-semibold">
          Expected Delivery: {expectedDate}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {trackingSteps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-4">
            
            {/* Dot */}
            <div
              className={`w-4 h-4 rounded-full mt-1 
                ${step.completed ? "bg-green-600" : "bg-gray-400"}`}
            ></div>

            {/* Line */}
            <div className="flex flex-col">
              <p
                className={`font-semibold ${
                  step.completed ? "text-green-700" : "text-gray-600"
                }`}
              >
                {step.title}
              </p>

              {step.date && (
                <p className="text-sm text-gray-500">{step.date}</p>
              )}

              {/* Vertical line between steps */}
              {idx !== trackingSteps.length - 1 && (
                <div className="h-8 w-0.5 bg-gray-300 mt-2 ml-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackOrder;
