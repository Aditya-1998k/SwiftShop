import { useState, useEffect } from "react";
import apiClient from "../../utils/axios";

function AddressSelector({ selectedAddress, setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchAddresses = async () => {
    const res = await apiClient.get("users/addresses/");

    setAddresses(res.data.addresses);

    const def = res.data.addresses.find((a) => a.is_default);
    if (def) setSelectedAddress(def.id);
  };

  const handleAdd = async () => {
    await apiClient.post("users/address/add/", form);
    setShowNewAddressForm(false);
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Select Delivery Address</h2>

      {addresses.map((addr) => (
        <label
          key={addr.id}
          className="flex gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="address"
            checked={selectedAddress === addr.id}
            onChange={() => setSelectedAddress(addr.id)}
          />

          <div>
            <p className="font-semibold">
              {addr.name} – {addr.phone}
            </p>
            <p className="text-sm text-gray-600">
              {addr.line1}, {addr.line2}, {addr.city}, {addr.state} –{" "}
              {addr.pincode}
            </p>
          </div>
        </label>
      ))}

      {/* Add New */}
      <button
        className="mt-3 text-indigo-600 hover:underline"
        onClick={() => setShowNewAddressForm(true)}
      >
        + Add New Address
      </button>

      {showNewAddressForm && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">New Address</h3>

          <div className="grid grid-cols-2 gap-2">
            {/* Only show form fields (not is_default) */}
            {["name", "phone", "line1", "line2", "city", "state", "pincode"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.toUpperCase()}
                  className="border p-2 rounded"
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              )
            )}
          </div>

          <button
            onClick={handleAdd}
            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() => setShowNewAddressForm(false)}
            className="ml-3 text-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AddressSelector;
