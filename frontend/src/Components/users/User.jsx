import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { FiPhone, FiMapPin, FiUser, FiEdit2 } from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";
import EditUserModal from "./EditUserModal";

function User() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get("users/profile/");
      setProfile(res.data);
    } catch (err) {
      console.log("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-lg">
        Failed to load profile
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          My Account
        </h1>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

          {/* ================= TOP CARD ================= */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-8 text-white flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
              alt="Profile"
              className="h-24 w-24 rounded-full bg-white p-2 shadow-md"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-indigo-100">{profile.email}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpenUserModal(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition flex items-center gap-2"
              >
                <FiEdit2 /> Edit User
              </button>

              <button
                onClick={() => setOpenProfileModal(true)}
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition flex items-center gap-2"
              >
                <FiEdit2 /> Edit Profile
              </button>
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="p-8 grid sm:grid-cols-2 gap-8">

            {/* Phone */}
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <FiPhone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">
                  {profile.profile.phone || "Not added"}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="font-semibold text-gray-900">
                  {profile.profile.bio || "No bio available"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 sm:col-span-2">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-900">
                  {profile.profile.address || "No address added"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {openProfileModal && (
        <EditProfileModal
          profile={profile.profile}
          setIsOpen={setOpenProfileModal}
          refreshProfile={fetchUser}
        />
      )}

      {openUserModal && (
        <EditUserModal
          user={profile}
          setIsOpen={setOpenUserModal}
          refreshProfile={fetchUser}
        />
      )}
    </div>
  );
}

export default User;
