import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaShoppingBag,
  FaShoppingCart
} from "react-icons/fa";

function ProfileModal({ open, onClose, onLogout, user }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">

        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition"
          >
            ✕
          </button>

          <img
            src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
            className="h-20 w-20 mx-auto rounded-full bg-white p-2 shadow-md"
            alt="Profile"
          />

          <h2 className="mt-3 text-lg font-semibold">
            {user?.first_name} {user?.last_name}
          </h2>

          <p className="text-sm text-indigo-100">
            {user?.email}
          </p>
        </div>

        {/* ===== BODY ===== */}
        <div className="p-5 space-y-2">

          <Link
            to="/user"
            onClick={onClose}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaUser className="text-indigo-600" />
            <span className="font-medium text-gray-800">
              View Profile
            </span>
          </Link>

          <Link
            to="/my-orders"
            onClick={onClose}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaShoppingBag className="text-indigo-600" />
            <span className="font-medium text-gray-800">
              My Orders
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaShoppingCart className="text-indigo-600" />
            <span className="font-medium text-gray-800">
              My Cart
            </span>
          </Link>

          <hr className="my-3" />

          <button
            onClick={onLogout}
            className="flex items-center gap-4 p-3 w-full rounded-xl hover:bg-red-50 text-red-600 transition"
          >
            <FaSignOutAlt />
            <span className="font-medium">
              Sign Out
            </span>
          </button>
        </div>
      </div>

      {/* ===== ANIMATION ===== */}
      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default ProfileModal;
