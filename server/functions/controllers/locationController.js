const admin = require("../firebase");
const logger = require("firebase-functions/logger");
const db = admin.firestore();

const COLLECTION = "locations";

// Get All Locations
exports.getLocations = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(locations);
  } catch (error) {
    logger.error("Error fetching locations", { error: error.message });
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// Add Location
exports.addLocation = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newLocation = {
      name,
      address,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      enabled: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection(COLLECTION).add(newLocation);
    res.status(201).json({ id: docRef.id, ...newLocation });
  } catch (error) {
    logger.error("Error adding location", { error: error.message });
    res.status(500).json({ error: "Failed to add location" });
  }
};

// Delete Location
exports.deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection(COLLECTION).doc(id).delete();
    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    logger.error("Error deleting location", { error: error.message });
    res.status(500).json({ error: "Failed to delete location" });
  }
};
