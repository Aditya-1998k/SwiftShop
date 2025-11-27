import { Link } from "react-router-dom";

function ProfileModal({ open, onClose, onLogout, user }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">

        <img
          src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
          className="h-20 w-20 rounded-full mx-auto" alt="Profile"
        />

        <h2 className="text-xl font-semibold mt-3"> {user?.first_name} {user?.last_name}</h2>
        <p className="text-gray-600 mb-4">{user?.email}</p>

        <Link
          to="/user" className="block mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
          onClick={onClose}
        > View Full Profile </Link>

        <button onClick={onLogout} className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
          Sign Out
        </button>

        <button onClick={onClose}
          className="mt-3 w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
