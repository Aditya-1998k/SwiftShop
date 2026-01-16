import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add them to your cart, and complete payment using Razorpay or Cash on Delivery.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Go to My Orders → Select your order → Click on Track Order to see real-time updates.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "We support Razorpay for online payments and Cash on Delivery (COD).",
    },
    {
      question: "Can I cancel or return my order?",
      answer:
        "Yes, you can request cancellation before shipping. Returns are accepted within 7 days of delivery.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Use the Support button on the order page or email us at aditya98gupta@gmail.com.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Everything you need to know about shopping on SwiftShop
          </p>
        </div>

        {/* ================= FAQ LIST ================= */}
        <div className="bg-white rounded-2xl shadow-lg divide-y">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>

                  <FaChevronDown
                    className={`text-indigo-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default FAQ;
