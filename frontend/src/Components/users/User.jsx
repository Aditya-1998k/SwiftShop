import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { FiPhone, FiMapPin, FiUser, FiEdit2 } from "react-icons/fi";

function User() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("users/profile/");
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Profile fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600 text-lg">Loading profile...</p>;

  if (!profile)
    return <p className="text-center mt-10 text-red-500 text-lg">Failed to load profile</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">

      {/* Glass UI Card */}
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* Top Section */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
            <img
              src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mt-4 flex items-center gap-2">
            <FiUser className="text-indigo-600" />
            {profile.first_name} {profile.last_name}
          </h2>

          <p className="text-gray-600">{profile.email}</p>

          {/* Edit Button */}
          <button className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition flex items-center gap-2">
            <FiEdit2 size={16} /> Edit Profile
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Info Section */}
        <div className="space-y-5">

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <FiPhone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold">{profile.profile.phone || "Not added"}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <FiUser size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bio</p>
              <p className="font-semibold">{profile.profile.bio || "No bio available"}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <FiMapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-semibold">{profile.profile.address || "No address added"}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default User;
