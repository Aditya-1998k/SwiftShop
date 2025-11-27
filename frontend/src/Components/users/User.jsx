import axios from "../../utils/axios"
import { useState, useEffect } from "react";

function User() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("users/profile/");
      setProfile(res.data);
      setLoading(false)
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10">Failed to load profile</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">

      <div className="flex flex-col items-center">
        <img src="https://www.reshot.com/preview-assets/icons/68ZR2F7VPJ/user-profile-68ZR2F7VPJ.svg"
          alt="Profile" className="w-28 h-28 rounded-full object-cover border"
        />
        <h2 className="text-2xl font-bold mt-4">{profile.email}</h2>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md">Edit Profile</button>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{profile.profile.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Bio</p>
          <p className="font-medium">{profile.profile.bio}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{profile.profile.address}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
