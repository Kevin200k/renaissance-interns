import React, { useState } from "react";

const LocationSettings = () => {
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Main Campus",
      address: "123 University Ave, Lagos",
      latitude: "6.5244",
      longitude: "3.3792",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLocation = () => {
    if (!form.name || !form.address || !form.latitude || !form.longitude) return;
    const newLocation = {
      id: Date.now(),
      ...form,
    };
    setLocations([...locations, newLocation]);
    setForm({ name: "", address: "", latitude: "", longitude: "" });
  };

  const deleteLocation = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📍 Location Settings</h2>

      {/* Location Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Location Name"
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          type="text"
          placeholder="Latitude"
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          type="text"
          placeholder="Longitude"
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
      <button
        onClick={addLocation}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Add Location
      </button>

      {/* Location List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Allowed Locations</h3>
        <div className="grid grid-cols-1 gap-4">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="border border-gray-200 p-4 rounded-md flex justify-between items-center hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{loc.name}</p>
                <p className="text-sm text-gray-500">{loc.address}</p>
                <p className="text-sm text-gray-500">
                  Lat: {loc.latitude}, Lng: {loc.longitude}
                </p>
              </div>
              <button
                onClick={() => deleteLocation(loc.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
          {locations.length === 0 && (
            <p className="text-sm text-gray-500 italic">No locations added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;
