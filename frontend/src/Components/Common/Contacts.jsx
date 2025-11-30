import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
        name: "", email: "", message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("⏳ Sending...");

    const formData = new FormData();
    formData.append("access_key", "a8627dcf--49be-be30-73012550d669");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message Sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message. Please try again later.");
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {status && (
              <p className="text-center font-medium mb-2">
                {status}
              </p>
            )}

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input type="text" name="name"
                value={form.name} onChange={handleChange}
                required className="mt-1 w-full p-3 border rounded-lg focus:border-indigo-600 focus:ring"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} required
                className="mt-1 w-full p-3 border rounded-lg focus:border-indigo-600 focus:ring"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" value={form.message}
                onChange={handleChange} required
                className="mt-1 w-full p-3 border rounded-lg h-32 resize-none focus:border-indigo-600 focus:ring"
                placeholder="Write your message..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>

          <div className="space-y-5">

            {/* Phone */}
            <div className="flex items-center gap-4">
              <FaPhone className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+91 9643652605</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">aditya98gupta@gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-indigo-600 text-xl mt-1" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  SwiftShop HQ, Bangalore, Karnataka, India
                </p>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="mt-6">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-56 rounded-xl border"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
