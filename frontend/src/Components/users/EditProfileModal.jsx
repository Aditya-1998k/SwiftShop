import { useState } from "react";
import apiClient from "../../utils/axios";

function EditProfileModal({ profile, setIsOpen, refreshProfile }) {
  const [form, setForm] = useState({
    bio: profile.bio || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
    address: profile.address || "",
    promotional_emails: profile.promotional_emails || true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await apiClient.patch("users/profile/update/", form);
        refreshProfile();
        setIsOpen(false);
    } catch (err) {
        console.log("Update failed:", err);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Bio */}
          <div>
            <label className="text-sm text-gray-600">Bio</label>
            <input type="text" name="bio" value={form.bio}
              onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input type="text" name="phone" value={form.phone}
              onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input type="text" name="address" value={form.address}
              onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Promotional Emails */}
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="promotional_emails"
              checked={form.promotional_emails} onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-gray-700">Receive promotional emails</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >Cancel</button>

            <button type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
