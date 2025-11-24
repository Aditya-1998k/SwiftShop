import axios from "axios";
import { useState, useEffect } from "react";

function User() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch_data = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/users/profile/1/");
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_data();
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
        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile" className="w-28 h-28 rounded-full object-cover border"
        />

        <h2 className="text-2xl font-bold mt-4">{profile.user.email}</h2>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md">
          Edit Profile
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{profile.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Bio</p>
          <p className="font-medium">{profile.bio}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{profile.address}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
