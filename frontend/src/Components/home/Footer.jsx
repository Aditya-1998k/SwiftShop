import React from "react";
import {
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Company Info */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">
            SwiftShop
          </h2>
          <p className="text-gray-400 text-sm">
            Your trusted ecommerce marketplace for everyday essentials,
            electronics, groceries, and lifestyle products.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            Contact Us
          </h3>

          <div className="flex items-start gap-3 mb-3">
            <FaMapMarkerAlt size={18} className="mt-1" />
            <p className="text-sm"> SwiftShop HQ, MG Road,<br /> Bengaluru, India</p>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <FaPhone size={18} />
            <p className="text-sm">+91 9643652605</p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope size={18} />
            <p className="text-sm">support@swiftshop.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} SwiftShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
