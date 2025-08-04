import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSettings = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations");
      console.log("Fetched Locations Response:", res.data);

      // Ensure locations is always an array
      const data = res.data;
      if (Array.isArray(data.locations)) {
        setLocations(data.locations);
      } else if (Array.isArray(data)) {
        setLocations(data);
      } else {
        setLocations([]);  // fallback
      }

    } catch (err) {
      console.error("Failed to fetch locations", err);
      setLocations([]);  // Prevents undefined.map error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLocation = async () => {
    if (!form.name || !form.address || !form.latitude || !form.longitude) return;

    try {
      await axios.post("/locations", {
        name: form.name,
        address: form.address,
        lat: parseFloat(form.latitude),
        lng: parseFloat(form.longitude),
        radius: 100,
      });

      setForm({ name: "", address: "", latitude: "", longitude: "" });
      fetchLocations();  // Refresh after add
    } catch (err) {
      console.error("Failed to add location", err);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`/locations/${id}`);
      setLocations(locations.filter((loc) => loc.id !== id));
    } catch (err) {
      console.error("Failed to delete location", err);
    }
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

        {loading ? (
          <p className="text-gray-500 italic">Loading locations...</p>
        ) : locations.length > 0 ? (
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
                    Lat: {loc.lat}, Lng: {loc.lng}
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
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No locations added yet.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSettings;
