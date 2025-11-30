import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
        "Use the Support button on the order page or email us at support@swiftshop.com.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-20 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <FaChevronUp className="text-indigo-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
