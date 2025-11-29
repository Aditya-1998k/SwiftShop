import { useState, useEffect } from "react";
import apiClient from "../../utils/axios";

function AddressSelector({ selectedAddress, setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const res = await apiClient.get("users/addresses/");
    setAddresses(res.data.addresses);

    // auto-select default address
    const def = res.data.addresses.find((a) => a.is_default);
    if (def) setSelectedAddress(def.id);
  };

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
              {addr.name} — {addr.phone}
            </p>
            <p className="text-sm text-gray-600">
              {addr.line1}, {addr.line2}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
          </div>
        </label>
      ))}

      <button
        className="mt-3 text-indigo-600 hover:underline"
        onClick={() => setShowNewAddressForm(true)}
      >
        + Add New Address
      </button>

      {/* New Address Form (Render later) */}
      {showNewAddressForm && (
        <p className="mt-2 text-gray-600">New address form coming soon…</p>
      )}
    </div>
  );
}

export default AddressSelector;
