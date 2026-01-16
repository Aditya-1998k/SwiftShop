import React from "react";
import {
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaStackOverflow
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* ================= BRAND ================= */}
        <div>
          <h2 className="text-white text-2xl font-extrabold mb-3 tracking-wide">
            SwiftShop
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Your trusted ecommerce marketplace for everyday essentials,
            electronics, groceries, and lifestyle products.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <a
              target="blank"
              href="https://stackoverflow.com/users/20287985/aditya-gupta"
              className="p-3 rounded-full bg-gray-800 hover:bg-orange-500 text-gray-300 hover:text-white transition"
            >
              <FaStackOverflow size={18} />
            </a>

            <a
              target="blank"
              href="https://github.com/Aditya-1998k"
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              target="blank"
              href="https://www.linkedin.com/in/aditya-gupta1998/"
              className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white transition">
                Products
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">
            Contact Us
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 text-indigo-400" />
              <p>
                SwiftShop HQ, MG Road <br />
                Bengaluru, India
              </p>
            </div>

            <div className="flex gap-3">
              <FaPhone className="text-indigo-400" />
              <p>+91 9643652605</p>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-indigo-400" />
              <p>support@swiftshop.com</p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SwiftShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
