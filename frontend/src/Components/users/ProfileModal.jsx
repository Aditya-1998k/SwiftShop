import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

function ProfileModal({ open, onClose, onLogout, user }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-2xl shadow-2xl p-7 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Profile Avatar */}
        <div className="flex justify-center">
          <img
            src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
            className="h-20 w-20 rounded-full shadow-lg border-2 border-indigo-600 p-1 bg-white"
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-bold text-gray-800 text-center mt-4">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-gray-500 text-center text-sm">{user?.email}</p>

        <hr className="my-4" />

        {/* Action Buttons */}
        <div className="space-y-3">

          <Link
            to="/user"
            onClick={onClose}
            className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            <FaUser /> View Full Profile
          </Link>

          <Link
            to="/my-orders"
            onClick={onClose}
            className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            <FaShoppingBag /> My Orders
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            <FaShoppingCart /> My Cart
          </Link>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full transition"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      {/* Simple fade animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default ProfileModal;
